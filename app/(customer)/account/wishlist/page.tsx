'use client'

import WishlistCard from "@/app/(customer)/account/_components/wishlistCard";
import ClearWishlist from "@/app/(customer)/account/_components/ClearWishlist";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useWishlistContext} from "@/app/(customer)/account/context/wishlistContext";


export default function WishlistPage() {


    const {products} =  useWishlistContext();

    if (!products) {
        return (
            <div className="container mx-auto px-4 py-8 ">
                <h1 className="text-3xl font-bold mb-6 flex items-center text-secondary ">
                    My Wishlist
                </h1>
                <p className="text-gray-600">Your wishlist is empty</p>
            </div>
        )
    }



    return (
        <ScrollArea className="container w-full m-2 shadow-sm p-2 overflow-auto">
            <div className={"flex justify-between items-baseline"}>
                <h1 className="text-3xl font-bold mb-6 flex items-center text-secondary ">
                    My Wishlist ({products.length})
                </h1>
                <ClearWishlist/>
            </div>

            {products.map((item) => (
                <WishlistCard product={item} key={item.id}/>
            ))}
        </ScrollArea>
    )
}

