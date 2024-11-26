'use server';
import {prisma} from "@/lib/prisma";

export async function getSubCategoryProductsAction(sub_category: string, page: number = 1, limit: number = 12): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
}> {
    const totalProducts = await prisma.product.count();

    console.log("Total products", totalProducts, "From sub category", sub_category);

    const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            sub_category_id: sub_category,
        },
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