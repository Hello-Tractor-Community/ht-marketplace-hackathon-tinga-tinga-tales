'use server';

import {getCurrentSession} from "@/lib/server/sessions";
import {prisma} from "@/lib/prisma";
import {ActionResult} from "next/dist/server/app-render/types";

export async function addToWishlistAction( productId: string): Promise<ActionResult> {
    console.log("call addToWishlistAction");

    const { session } = await getCurrentSession();
    if (session === null) {
        return {
            message: "Not authenticated"
        };
    }

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    console.log(product);

    if (product === null) {
        return {
            message: "Product not found"
        };
    }

    const wishlist = await prisma.wishlist.findFirst({
        where: {
            user_id: session.userId
        }
    })

    let wishlistId;

    if (wishlist === null) {
        const newWishlist = await prisma.wishlist.create({
            data: {
                user_id: session.userId,
            }
        })

        wishlistId = newWishlist.id;

        console.log("New wishlist ", newWishlist);
    }else {
        wishlistId = wishlist.id;
    }

    console.log("Wishlist ", wishlist);

    const existingProduct = await prisma.wishlistProduct.findUnique({
        where: {
            id: productId,
            wishlist_id: wishlistId,
            product_id: productId
        }
    });

    if (existingProduct !== null) {
        return {
            message: "Product already in wishlist"
        };
    }

    const addedProduct = await prisma.wishlistProduct.create({
        data: {
            id: productId,
            wishlist_id: wishlistId,
            product_id: productId
        }
    })

    console.log("Added product ", addedProduct);


    return {
        message: "Product added to wishlist"
    };
}

export async function removeFromWishlistAction( productId: string): Promise<ActionResult> {
    const { session } = await getCurrentSession();
    if (session === null) {
        return {
            message: "Not authenticated"
        };
    }

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    console.log(`delete product ${product}`);

    if (product === null) {
        return {
            message: "Product not found"
        };
    }

    const wishlist = await prisma.wishlist.findFirst({
        where: {
            user_id: session.userId
        }
    })

    if (wishlist === null) {
        return {
            message: "Wishlist not found"
        };
    }

    await prisma.wishlistProduct.delete({
        where: {
            id: productId,
            wishlist_id: wishlist.id,
            product_id: productId
        }
    })

    return {
        message: "Product removed from wishlist"
    };
}



export async function getWishlistAction(userId: string) : Promise<Product[]> {
    try {

        const wishlist = await prisma.wishlist.findFirst({
            where: {
                user_id: userId
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                brand: true,
                                product_images: true
                            }
                        }
                    }
                },
            }
        });
        console.log("Og ", wishlist);


        const w = wishlist?.products.map((p) => p.product);

        console.log("W ", w);
        return w || [];


        // if (wishlist === null) {
        //     return {
        //         message: "Wishlist not found"
        //     };
        // }

        // const wishlistProducts = await prisma.wishlistProduct.findMany({
        //     where: {
        //         wishlist_id: wishlist.id
        //     },
        //     include: {
        //         product: {
        //             include: {
        //                 brand: true,
        //                 product_images: true
        //             }
        //         }
        //     }
        // })

        // return wishlist || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function clearWishlistAction(): Promise<ActionResult> {
    const { session } = await getCurrentSession();
    if (session === null) {
        return {
            message: "Not authenticated"
        };
    }

    const wishlist = await prisma.wishlist.findFirst({
        where: {
            user_id: session.userId
        }
    })

    if (wishlist === null) {
        return {
            message: "Wishlist not found"
        };
    }

    await prisma.wishlistProduct.deleteMany({
        where: {
            wishlist_id: wishlist.id
        }
    })

    return {
        message: "Wishlist cleared"
    };
}