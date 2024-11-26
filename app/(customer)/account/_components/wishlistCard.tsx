'use client'

import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import Link from "next/link";
import {generateSlug} from "@/lib/utils";
import {useWishlistContext} from "@/app/(customer)/account/context/wishlistContext";



export default function WishlistCard({ product }: { product: Product }) {

    const { removeProduct } = useWishlistContext();

    const handleRemove = (productId: string) => {
        removeProduct(productId);
    };

    return(
        <Card key={product.id} className="overflow-hidden shadow-none hover:shadow-lg transition-shadow duration-300 p-2 h-auto sm:h-[12rem]">
            <CardContent className="p-2">
                <div className="flex flex-col md:flex-row gap-4 min-h-[10rem]">
                    <div className="relative w-full md:w-48 lg:w-64 h-40 flex-shrink-0">
                        <Image
                            src={product.product_images[0].image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="object-contain rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col justify-between w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                            <div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.brand.name} {product.model} - {product.year}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(product.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="mt-4 sm:mt-0">
                            {product.quantity_in_stock != null ? (
                                <div className="space-y-2 sm:space-y-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    ${product.price.toLocaleString()}
                  </span>
                                    <Link
                                        href={`/product/${generateSlug(product.name)}-${product.id}`}
                                        className="bg-primary hover:bg-primary/90 text-white text-sm py-2 px-4 rounded-lg inline-block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ) : (
                                <Badge variant="destructive" className="text-sm">
                                    Not Available
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}