"use server";

import {
    createEmailVerificationRequest,
    deleteEmailVerificationRequestCookie,
    deleteUserEmailVerificationRequest,
    getUserEmailVerificationRequestFromRequest,
    sendVerificationEmailBucket,
    setEmailVerificationRequestCookie
} from "@/lib/server/email-verification";
// import { invalidateUserPasswordResetSessions } from "@/lib/server/password";
import { ExpiringTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { redirect } from "next/navigation";
import {sendEmail} from "@/lib/server/email";
import {prisma} from "@/lib/prisma";

const bucket = new ExpiringTokenBucket<string>(5, 60 * 30);

export async function verifyEmailAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {

    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }

    const { session, user } = await getCurrentSession();
    if (session === null) {
        return {
            message: "Not authenticated"
        };
    }
    if (!bucket.check(user.id, 1)) {
        return {
            message: "Too many requests"
        };
    }

    let verificationRequest = await getUserEmailVerificationRequestFromRequest();
    if (verificationRequest === null) {
        return {
            message: "Not authenticated"
        };
    }

    const code = formData.get("code");
    if (typeof code !== "string") {
        return {
            message: "Invalid code"
        };
    }


    if (!bucket.consume(user.id, 1)) {
        return {
            message: "Too many requests"
        };
    }
    if (Date.now() >= verificationRequest.expires_at.getTime()) {
        verificationRequest = await createEmailVerificationRequest(verificationRequest.userId, verificationRequest.email);
        await sendEmail(
            {to: verificationRequest.email, subject: "Verify your email", html: `Your verification code is ${verificationRequest.code}`}
        );
        return {
            message: "The verification code was expired. We sent another code to your inbox."
        };
    }
    if (verificationRequest.code !== code) {
        return {
            message: "Incorrect code."
        };
    }
    await deleteUserEmailVerificationRequest(user.id);
    // invalidateUserPasswordResetSessions(user.[id]);
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            is_verified: true
        }
    });
    await deleteEmailVerificationRequestCookie();
    return redirect("/");
}

export async function resendEmailVerificationCodeAction(): Promise<ActionResult> {
    const { session, user } = await getCurrentSession();
    if (session === null) {
        return {
            message: "Not authenticated"
        };
    }
    if (!sendVerificationEmailBucket.check(user.id, 1)) {
        return {
            message: "Too many requests"
        };
    }

    let verificationRequest = await getUserEmailVerificationRequestFromRequest();
    if (verificationRequest === null) {
        if (user.is_verified) {
            return {
                message: "Forbidden"
            };
        }
        if (!sendVerificationEmailBucket.consume(user.id, 1)) {
            return {
                message: "Too many requests"
            };
        }
        verificationRequest = await createEmailVerificationRequest(user.id, user.email);
    } else {
        if (!sendVerificationEmailBucket.consume(user.id, 1)) {
            return {
                message: "Too many requests"
            };
        }
        verificationRequest = await createEmailVerificationRequest(user.id, verificationRequest.email);
    }

    await sendEmail({
        to: verificationRequest.email,
        subject: "Verify your email",
        html: `Your verification code is ${verificationRequest.code}`
    });
    await setEmailVerificationRequestCookie(verificationRequest);

    return {
        message: "A new code was sent to your inbox."
    };
}

interface ActionResult {
    message: string;
}