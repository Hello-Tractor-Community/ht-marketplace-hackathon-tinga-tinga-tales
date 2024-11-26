import { encodeHexLowerCase } from "@oslojs/encoding";
import { generateRandomOTP } from "./utils";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import {prisma} from "@/lib/prisma";

export async function createPasswordResetSession(token: string, userId: string, email: string): Promise<PasswordResetSession> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: PasswordResetSession = {
        id: sessionId,
        userId,
        email,
        expires_at: new Date(Date.now() + 1000 * 60 * 10),
        code: generateRandomOTP(),
        email_verified: false,
    };
    // db.execute("INSERT INTO password_reset_session (id, user_id, email, code, expires_at) VALUES (?, ?, ?, ?, ?)", [
    //     session.id,
    //     session.userId,
    //     session.email,
    //     session.code,
    //     Math.floor(session.expires_at.getTime() / 1000)
    // ]);
    await prisma.passwordResetSession.create({
        data: {
            id: session.id,
            userId: session.userId,
            email: session.email,
            code: session.code,
            expires_at: session.expires_at
        }
    });
    return session;
}


export async function validatePasswordResetSessionToken(token: string) {
    // Hash the token
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    // Query the database using Prisma
    const session = await prisma.passwordResetSession.findUnique({
        where: { id: sessionId },
        include: { user: true }, // Include the associated user data
    });

    if (!session) {
        return { session: null, user: null };
    }

    // Convert session to required format
    const passwordResetSession = {
        id: session.id,
        userId: session.userId,
        email: session.email,
        code: session.code,
        expires_at: session.expires_at,
        email_verified: session.email_verified,
    };

    const user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        phone: session.user.phone,
        role: session.user.role,
        email_verified: session.user.is_verified,
        status: session.user.status
    };

    // Check expiration
    if (Date.now() >= new Date(session.expires_at).getTime()) {
        await prisma.passwordResetSession.delete({
            where: { id: session.id },
        });
        return { session: null, user: null };
    }

    return { session: passwordResetSession, user };
}

export async function setPasswordResetSessionAsEmailVerified(sessionId: string): Promise<void> {
    // db.execute("UPDATE password_reset_session SET email_verified = 1 WHERE id = ?", [sessionId]);
      await prisma.passwordResetSession.update({
        where: { id: sessionId },
        data: { email_verified: true },
    });
}

// export function setPasswordResetSessionAs2FAVerified(sessionId: string): void {
//     db.execute("UPDATE password_reset_session SET two_factor_verified = 1 WHERE id = ?", [sessionId]);
// }

export async function invalidateUserPasswordResetSessions(userId: string): Promise<void> {
    // db.execute("DELETE FROM password_reset_session WHERE user_id = ?", [userId]);
    await prisma.passwordResetSession.deleteMany({
        where: { userId },
    });
}

export async function validatePasswordResetSessionRequest(): Promise<PasswordResetSessionValidationResult> {
    const token = cookies().get("password_reset_session")?.value ?? null;
    if (token === null) {
        return { session: null, user: null };
    }
    const result = await validatePasswordResetSessionToken(token);
    if (result.session === null) {
        await deletePasswordResetSessionTokenCookie();
    }
    return result;
}

export async function setPasswordResetSessionTokenCookie(token: string, expires_at: Date): Promise<void> {
    cookies().set("password_reset_session", token, {
        expires: expires_at,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production"
    });
}

export async function deletePasswordResetSessionTokenCookie(): Promise<void> {
    cookies().set("password_reset_session", "", {
        maxAge: 0,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production"
    });
}

// export function sendPasswordResetEmail(email: string, code: string): void {
//     console.log(`To ${email}: Your reset code is ${code}`);
// }

export interface PasswordResetSession {
    id: string;
    userId: string;
    email: string;
    expires_at: Date;
    code: string;
    email_verified: boolean;
}

export type PasswordResetSessionValidationResult =
    | { session: PasswordResetSession; user: User }
    | { session: null; user: null };