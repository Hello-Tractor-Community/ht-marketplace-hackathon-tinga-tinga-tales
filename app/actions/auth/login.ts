"use server";
import { verifyPasswordHash } from "@/lib/server/password";
import { RefillingTokenBucket, Throttler } from "@/lib/server/rate-limit";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/lib/server/sessions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { globalPOSTRateLimit } from "@/lib/server/request";
import {prisma} from "@/lib/prisma";

const throttler = new Throttler<string>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

export async function loginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
    if (!globalPOSTRateLimit()) {
        return {
            message: "Too many requests"
        };
    }
    const clientIP = headers().get("X-Forwarded-For");
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
        return {
            message: "Too many requests"
        };
    }

    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
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
    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
        return {
            message: "Too many requests"
        };
    }
    if (!throttler.consume(user.id)) {
        return {
            message: "Too many requests"
        };
    }
    const passwordHash = user.password;
    if (passwordHash === null) {
        return {
            message: "Invalid password. Please try again."
        };
    }
    const validPassword = await verifyPasswordHash(passwordHash, password);
    if (!validPassword) {
        return {
            message: "Invalid password. Please try again."
        };
    }
    throttler.reset(user.id);
    // const sessionFlags: SessionFlags = {
    //     twoFactorVerified: false
    // };
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expires_at);

    if (!user.is_verified) {
        return redirect("/verify_email");
    }
    // if (!user.registered2FA) {
    //     return redirect("/2fa/setup");
    // }
    return redirect("/");
}

interface ActionResult {
    message: string;
}