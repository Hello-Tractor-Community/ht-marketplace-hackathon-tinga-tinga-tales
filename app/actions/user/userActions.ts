import {prisma} from "@/lib/prisma";

export async function getUserDetails(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return {
            message: "User not found"
        };
    }
    return user;
}