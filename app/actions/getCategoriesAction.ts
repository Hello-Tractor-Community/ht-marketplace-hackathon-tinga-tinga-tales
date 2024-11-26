'use server';

import {prisma} from "@/lib/prisma";

export async function getCategories(){
    try {
        const categories = await prisma.category.findMany({
            include: {
                sub_categories: {
                    select: {
                        name: true,
                        description: true,
                        _count : {
                            select: {
                                products: true
                            }
                        },
                    }
                },
            }
        });

        return categories || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}