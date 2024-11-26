'use client'

import {Button} from "@/components/ui/button";
import {useWishlistContext} from "@/app/(customer)/account/context/wishlistContext";

export default function ClearWishlist() {

    const {clearWishlist} = useWishlistContext();

    const handleRemove = () => {
        clearWishlist();
    }

    return (
        <div>
            <Button className={"border-none bg-transparent shadow-none text-primary text-lg hover:bg-transparent hover:underline hover:underline-offset-8"} onClick={() => handleRemove()}>
                Clear all
            </Button>
        </div>
    )
}