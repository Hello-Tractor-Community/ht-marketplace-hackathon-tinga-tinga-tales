"use server";
import {prisma} from "@/lib/prisma";

export async function fetchListingsAction(page: number = 1, limit: number = 12,): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
}> {
    const totalProducts = await prisma.product.count();

    const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
            brand: true,
            product_images: true,
        },
        orderBy: {
            name: "desc",
        },
    });

    return {
        data: products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
    };
}
