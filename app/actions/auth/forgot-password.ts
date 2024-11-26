"use server";

import {sendEmail} from "@/lib/server/email";
import {
    createPasswordResetSession,
    invalidateUserPasswordResetSessions,
    setPasswordResetSessionTokenCookie
} from "@/lib/server/password-reset";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { generateSessionToken } from "@/lib/server/sessions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {prisma} from "@/lib/prisma";

const passwordResetEmailIPBucket = new RefillingTokenBucket<string>(3, 60);
const passwordResetEmailUserBucket = new RefillingTokenBucket<string>(3, 60);

export async function forgotPasswordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }

    const clientIP = headers().get("X-Forwarded-For");
    if (clientIP !== null && !passwordResetEmailIPBucket.check(clientIP, 1)) {
        return {
            message: "Too many requests"
        };
    }

    const email = formData.get("email");
    if (typeof email !== "string") {
        return {
            message: "Invalid or missing fields"
        };
    }
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user === null) {
        return {
            message: "Account does not exist"
        };
    }
    if (clientIP !== null && !passwordResetEmailIPBucket.consume(clientIP, 1)) {
        return {
            message: "Too many requests"
        };
    }
    if (!passwordResetEmailUserBucket.consume(user.id, 1)) {
        return {
            message: "Too many requests"
        };
    }
    await invalidateUserPasswordResetSessions(user.id);
    const sessionToken = generateSessionToken();
    const session = await createPasswordResetSession(sessionToken, user.id, user.email)
    await sendEmail({to: user.email, subject: "Reset your password", html: `Your password reset code is ${session.code}`});
    await setPasswordResetSessionTokenCookie(sessionToken, session.expires_at);
    return redirect("/reset-password/verify-email");
}

interface ActionResult {
    message: string;
}