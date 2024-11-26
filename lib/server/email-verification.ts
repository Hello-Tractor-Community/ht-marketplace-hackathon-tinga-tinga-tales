import {generateRandomOTP} from "./utils";
import {prisma} from "@/lib/prisma";
import {ExpiringTokenBucket} from "./rate-limit";
import {encodeBase32} from "@oslojs/encoding";
import {cookies} from "next/headers";
import {getCurrentSession} from "./sessions";

export async function getUserEmailVerificationRequest(userId: string, id: string): Promise<EmailVerificationRequest | null> {
    const [request] = await Promise.all([prisma.emailVerification.findFirst({
        where: {
            id: id,
            userId: userId
        }
    })]);
    return request;
}

export async function createEmailVerificationRequest(userId: string, email: string): Promise<EmailVerificationRequest> {
    await deleteUserEmailVerificationRequest(userId);
    const idBytes = new Uint8Array(20);
    crypto.getRandomValues(idBytes);
    const id = encodeBase32(idBytes).toLowerCase();

    const code = generateRandomOTP();
    const expires_at = new Date(Date.now() + 1000 * 60 * 10);

    return prisma.emailVerification.create({
        data: {
            id,
            userId,
            code,
            email,
            expires_at
        }
    });
}

export async function deleteUserEmailVerificationRequest(userId: string): Promise<void> {
    await prisma.emailVerification.deleteMany({
        where: {
            userId: userId
        }
    });
}


export async function setEmailVerificationRequestCookie(request: EmailVerificationRequest): Promise<void> {
    cookies().set("email_verification", request.id, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: request.expires_at
    });
}

export async function deleteEmailVerificationRequestCookie(): Promise<void> {
    cookies().set("email_verification", "", {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0
    });
}

export async function getUserEmailVerificationRequestFromRequest(): Promise<EmailVerificationRequest | null> {
    const { user } = await getCurrentSession();
    if (user === null) {
        return null;
    }
    const id = cookies().get("email_verification")?.value ?? null;
    if (id === null) {
        return null;
    }
    const request = await getUserEmailVerificationRequest(user.id, id);
    if (request === null) {
        await deleteEmailVerificationRequestCookie();
    }
    return request;
}


export const sendVerificationEmailBucket = new ExpiringTokenBucket<string>(3, 60 * 10);

export interface EmailVerificationRequest {
    id: string;
    userId: string;
    code: string;
    email: string;
    expires_at: Date;
}