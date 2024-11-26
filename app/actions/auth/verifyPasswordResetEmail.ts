"use server";

import {
    createPasswordResetSession, deletePasswordResetSessionTokenCookie,
    invalidateUserPasswordResetSessions,
    setPasswordResetSessionAsEmailVerified, setPasswordResetSessionTokenCookie,
    validatePasswordResetSessionRequest
} from "@/lib/server/password-reset";
import { ExpiringTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { redirect } from "next/navigation";
import {generateSessionToken} from "@/lib/server/sessions";
import {sendEmail} from "@/lib/server/email";

const emailVerificationBucket = new ExpiringTokenBucket<string>(5, 60 * 30);

export async function verifyPasswordResetEmailAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }
    const { session } = await validatePasswordResetSessionRequest();

    if (session === null) {

        return redirect("/sign_in");
    }
    if (session.email_verified) {
        return redirect("/sign_in");
    }
    if (!emailVerificationBucket.check(session.userId, 1)) {
        return {
            message: "Too many requests"
        };
    }

    const code = formData.get("otp");


    if (typeof code !== "string") {
        return {
            message: "Invalid code"
        };
    }

    if (!emailVerificationBucket.consume(session.userId, 1)) {
        return { message: "Too many requests" };
    }
    if (code !== session.code) {
        return {
            message: "Incorrect code"
        };
    }
    emailVerificationBucket.reset(session.userId);
    await setPasswordResetSessionAsEmailVerified(session.id);

    return redirect("/reset-password");
}

export async function resendPasswordResetCodeAction(): Promise<ActionResult> {
    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }

    const { session } = await validatePasswordResetSessionRequest();


    if (session === null) {
        return redirect("/sign_in");
    }
    if (session.email_verified) {
        return redirect("/sign_in");
    }
    await invalidateUserPasswordResetSessions(session.userId);
    await deletePasswordResetSessionTokenCookie();
    const sessionToken = generateSessionToken();
    const newSession = await createPasswordResetSession(sessionToken, session.userId, session.email);

    await sendEmail({to: session.email, subject: "Reset your password", html: `Your password reset code is ${newSession.code}`});
    await setPasswordResetSessionTokenCookie(sessionToken, session.expires_at);
    return {
        message: "A new code was sent to your inbox."
    };
}

interface ActionResult {
    message: string;
}