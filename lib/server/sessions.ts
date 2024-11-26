

import {prisma} from "../prisma";
import {encodeBase32LowerCaseNoPadding, encodeHexLowerCase} from "@oslojs/encoding";
import {sha256} from "@oslojs/crypto/sha2";

import type {Session, User} from "@prisma/client";
import {cookies} from "next/headers";
import {cache} from "react";

export const getCurrentSession = cache( async (): Promise<SessionValidationResult> => {
    const token = cookies().get("session")?.value ?? null;
    if (token === null) {
        return { session: null, user: null };
    }
    return validateSessionToken(token);
});

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: string): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };
    await prisma.session.create({
        data: session
    });
    return session;
}

export function invalidateUserSessions(userId: string): void {
    // db.execute("DELETE FROM session WHERE user_id = ?", [userId]);
    prisma.session.deleteMany({
        where: {
            userId: userId
        }
    });
}

export async function setSessionTokenCookie(token: string, expires_at: Date): Promise<void> {
    cookies().set("session", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expires_at
    });
}

export async function deleteSessionTokenCookie(): Promise<void> {
    cookies().set("session", "", {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0
    });
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    });
    if (result === null) {
        return { session: null, user: null };
    }
    const { user, ...session } = result;
    if (Date.now() >= session.expires_at.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return { session: null, user: null };
    }
    if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prisma.session.update({
            where: {
                id: session.id
            },
            data: {
                expires_at: session.expires_at
            }
        });
    }
    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({ where: { id: sessionId } });
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };