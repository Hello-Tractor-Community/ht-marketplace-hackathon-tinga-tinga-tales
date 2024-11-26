"use server"

import {prisma} from "@/lib/prisma";

export async function getBrands(){
    try {
        const brands = await prisma.brand.findMany({
            select: {
                name: true,
                logo: true,
            }
        });
        console.log(brands);
        return brands || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}