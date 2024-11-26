"use server";
import {prisma} from "@/lib/prisma";

const user_id = "user2_id"; // Hardcoded for now

export async function getListings() {
    try {
        const listings = await prisma.product.findMany({
            where: {
                owner_id: user_id
            },
            select: {
                id: true,
                name: true,
                status: true,
                description: true,
                quantity_in_stock: true,
                price: true,
                location: true,
                model: true,
                used_time: true,
                year: true,
                history: true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                        logo: true,
                    }
                },
                product_images: {
                    select: {
                        id: true,
                        image: true,
                        product_id: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                sub_category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category_id: true,
                    }
                },
            },
        });
        console.log(listings);
        return listings || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function updateListing(data: Product) {
    try {
        const updatedListing = await prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                status: data.status,
                description: data.description,
                quantity_in_stock: data.quantity_in_stock,
                price: data.price,
                location: data.location,
                model: data.model,
                used_time: data.used_time,
                year: data.year,
                history: data.history,
                brand: {
                    connect: {
                        id: data.brand.id
                    }
                },
                category: {
                    connect: {
                        id: data.category.id
                    }
                },
                sub_category: {
                    connect: {
                        id: data.sub_category?.id
                    }
                }
            },
            select: {
                id: true,
                name: true,
                status: true,
                description: true,
                quantity_in_stock: true,
                price: true,
                location: true,
                model: true,
                used_time: true,
                year: true,
                history: true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                        logo: true,
                    }
                },
                product_images: {
                    select: {
                        id: true,
                        image: true,
                        product_id: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                sub_category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category_id: true,
                    }
                },
            },
        });
        console.log(updatedListing);
        return updatedListing || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteListing(id: string) {
    try {
        const deletedListing = await prisma.product.delete({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                status: true,
                description: true,
                quantity_in_stock: true,
                price: true,
                location: true,
                model: true,
                used_time: true,
                year: true,
                history: true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                        logo: true,
                    }
                },
                product_images: {
                    select: {
                        id: true,
                        image: true,
                        product_id: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                sub_category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category_id: true,
                    }
                },
            },
        });
        console.log(deletedListing);
        return deletedListing || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}