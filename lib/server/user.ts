import {prisma} from "@/lib/prisma";

export async function createUser(googleId: string, email: string, name: string, picture: string): Promise<User> {
    return prisma.user.create({
        data: {
            google_id: googleId,
            email,
            name,
            image: picture,
            role: "CUSTOMER"
        }
    });
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {

    const user = await prisma.user.findFirst({
        where: {
            google_id: googleId
        }
    });

    if (user === null) {
        return null;
    }

    return user;
}

