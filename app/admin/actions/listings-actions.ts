"use server";
import {prisma} from "@/lib/prisma";

export async function getListings() {
    try {
        const listings = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                status: true,
                description: true,
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
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        role: true,
                        status: true,
                    }
                },
            },
        });
        // console.log(listings);
        return listings || [];
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw new Error("Failed to fetch listings");
    }
}

export async function deleteListing(id: string) {
    try {
        return await prisma.product.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error("Error deleting listing:", error);
        throw new Error("Failed to delete listing");
    }
}

export async function updateListing(listing: Product) {
    try {
        return await prisma.product.update({
            where: {
                id: listing.id,
            },
            data: {
                status: listing.status,
            }
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        throw new Error("Failed to update listing");
    }
}