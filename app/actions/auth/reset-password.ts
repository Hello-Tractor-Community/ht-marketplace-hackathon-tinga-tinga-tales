"use server";

import {hashPassword} from "@/lib/server/password";
import {
    deletePasswordResetSessionTokenCookie,
    invalidateUserPasswordResetSessions,
    validatePasswordResetSessionRequest
} from "@/lib/server/password-reset";
import {
    createSession,
    generateSessionToken,
    invalidateUserSessions,
    setSessionTokenCookie
} from "@/lib/server/sessions";
import { redirect } from "next/navigation";
import { globalPOSTRateLimit } from "@/lib/server/request";
import {prisma} from "@/lib/prisma";



export async function resetPasswordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }
    const { session: passwordResetSession, user } = await validatePasswordResetSessionRequest();

    if (passwordResetSession === null) {
       return redirect("/sign_in");
    }

    if (!passwordResetSession.email_verified) {
        return redirect("/reset-password/verify-email");
    }



    const password = formData.get("password") ;

    if (typeof password !== "string") {
        return {
            message: "Invalid or missing fields"
        };
    }

    await invalidateUserPasswordResetSessions(passwordResetSession.userId);
    invalidateUserSessions(passwordResetSession.userId);
    const hashedPassword = await hashPassword(password);

    prisma.user.update({
        where: { id: passwordResetSession.userId },
        data: { password: hashedPassword }
    })

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expires_at);
    await deletePasswordResetSessionTokenCookie();
    return redirect("/");
}

interface ActionResult {
    message: string;
}