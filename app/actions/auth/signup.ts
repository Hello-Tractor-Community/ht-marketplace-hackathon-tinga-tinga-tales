'use server';

import {prisma} from "@/lib/prisma";
import {hashPassword} from "@/lib/server/password";
import {createEmailVerificationRequest, setEmailVerificationRequestCookie} from "@/lib/server/email-verification";
import {sendEmail} from "@/lib/server/email";
import {createSession, generateSessionToken, setSessionTokenCookie} from "@/lib/server/sessions";
import {redirect} from "next/navigation";


interface ActionResult {
    message: string;
}

export async function signupUser(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
    const email = formData.get("email");
    const phone = formData.get("phone");
    const name = formData.get("fullName");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof phone !== "string" || typeof name !== "string" || typeof password !== "string") {
        return {message: "Invalid Entry"};
    }


    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });


    if (existingUser) {
        return {message: "User already exists"};
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            email: email,
            phone: phone,
            name: name,
            password: hashedPassword,
            role: "CUSTOMER"
        }
    });

    const code = await createEmailVerificationRequest(user.id, user.email);
    await sendEmail({to: user.email, subject: "Verify your email", html: `Your verification code is ${code.code}`});
    await setEmailVerificationRequestCookie(code);
    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expires_at);

    return redirect("/verify-email");

}
