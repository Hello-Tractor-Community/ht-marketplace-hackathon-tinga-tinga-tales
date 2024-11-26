"use server";
import {prisma} from "@/lib/prisma";

export async function getDashboardData() {
    try {
        const totalUsers = await prisma.user.count();
        const totalDealers = await prisma.dealer.count();
        const totalSellers = await prisma.seller.count();
        const totalOperators = await prisma.operator.count();

        const users = await prisma.user.findMany({
            skip: (1 - 1) * 12,
            take: 12,
            include: {
                dealer: true,
                seller: true,
                operator: {
                    include: {
                        certifications: true
                    }
                },
            },
            orderBy: {
                name: "desc",
            },
        });

        const approvals = await prisma.user.findMany({
            where: {
                status: "Unapproved"
            },
            take: 2,
            orderBy: {
                created_at: "desc"
            }
        });

        const approvalsCount = await prisma.user.count({
            where: {
                status: "Unapproved"
            }
        });

        return {
            users,
            approvals,
            approvalsCount,
            totalUsers,
            totalDealers,
            totalSellers,
            totalOperators,
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw new Error("Failed to fetch dashboard data");
    }
}

export async function getUsersAction(page: number = 1, limit: number = 12): Promise<{
    data: User[];
    currentPage: number;
    totalPages: number;
}>  {
    try {

        const totalUsers = await prisma.user.count();

        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                dealer: true,
                seller: true,
                operator: {
                    include: {
                        certifications: true
                    }
                },
            },
            orderBy: {
                name: "desc",
            },
        });

        return {
            data: users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function updateUserAction(user: User) {
    try {

        return await prisma.user.update({
            where: {id: user.id},
            data: {
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role");
    }
}

export async function deleteUserAction(id: string) {
    try {
        return await prisma.user.delete({
            where: {id},
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
}

export async function banUserAction(id: string) {
    try {
        return await prisma.user.update({
            where: {id},
            data: {
                status: "Banned",
            },
        });
    } catch (error) {
        console.error("Error banning user:", error);
        throw new Error("Failed to ban user");
    }
}



// const users = await prisma.user.findMany({
//     select: {
//         id: true,
//         email: true,
//         phone: true,
//         name: true,
//         role: true,
//         status: true,
//         dealer: {
//             select: {
//                 business_permit_image: true,
//                 description: true,
//                 location: true,
//             }
//         },
//         seller: {
//             select: {
//                 description: true,
//                 location: true,
//             }
//         },
//         operator: {
//             select: {
//                 description: true,
//                 location: true,
//                 rate_card: true,
//                 experience: true,
//                 certifications: {
//                     select: {
//                         name: true,
//                         certification_image: true,
//                     }
//                 }
//             }
//         }
//     },
// });
// // console.log(users);