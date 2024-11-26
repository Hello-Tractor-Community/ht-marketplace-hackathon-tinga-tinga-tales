'use server';
import {prisma} from "@/lib/prisma";

export async function getProductAction(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      brand: true,
      product_images: true,
    },
  });
}