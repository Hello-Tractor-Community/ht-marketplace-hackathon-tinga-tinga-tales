'use server';
import {prisma} from "@/lib/prisma";

interface Approvals {
    users: User[];
    listings: Product[];
}

export async function getApprovalsAction() : Promise<Approvals> {
    const users = await prisma.user.findMany({
        where: {
            status: 'Pending'
        }
    });
    const listings = await prisma.product.findMany({
        where: {
            status: 'unapproved'
        },
        include: {
            brand: true,
            product_images: true
        }
    });

    return {users, listings};
}

