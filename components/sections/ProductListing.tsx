'use client'

import {startTransition, useState} from "react"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {LayoutGrid, List, ChevronLeft, ChevronRight, Plus} from 'lucide-react'
import CategorySidebar from "./CategoryBar"
import Link from "next/link";
import {generateSlug} from "@/lib/utils";
import {CategoriesProvider} from "@/context/categories-context";
import {addToWishlistAction} from "@/app/actions/wishlist/wishlist";


export default function ProductListing({products, totalPages, getPageProducts}: {
    products: Product[],
    totalPages: number,
    getPageProducts: (page: number) => Promise<void>
}) {
    const [viewType, setViewType] = useState<"grid" | "list">("grid")
    const [currentPage, setCurrentPage] = useState(1)


    function onNextPage() {
        if (currentPage < totalPages) {
            getPageProducts(currentPage + 1).then(() => setCurrentPage(currentPage + 1));
        }
    }

    function onPrevPage() {
        if (currentPage > 1) {
            getPageProducts(currentPage - 1).then(() => setCurrentPage(currentPage - 1));
        }
    }

    async function addToWishlist( productId: string) {
        console.log("calling addToWishlistAction");
        startTransition(
            async () => {
                await addToWishlistAction(productId)
            }
        )
    }


    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className={"sticky"}>
                    <CategoriesProvider>
                        <CategorySidebar/>
                    </CategoriesProvider>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className={"flex items-end space-x-2 border-b border-black pb-1 "}>
                            <p className={"font-bold"}>Sorted By:</p>
                            <Select defaultValue="name">
                                <SelectTrigger
                                    className="w-[180px] h-6 p-0 m-0 border-none bg-transparent ring-offset-transparent focus:ring-transparent shadow-none underline underline-offset-8">
                                    <SelectValue placeholder="Sort by"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className={"text-black font-bold"} value='name'>Name</SelectItem>
                                    <SelectItem className={"text-black font-bold"} value="brand">Brand</SelectItem>
                                    <SelectItem className={"text-black font-bold"} value="price-low">Price: Low to
                                        High</SelectItem>
                                    <SelectItem className={"text-black font-bold"} value="price-high">Price: High to
                                        Low</SelectItem>
                                    <SelectItem className={"text-black font-bold"} value="newest">Newest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className={"flex items-end gap-2 "}>
                            <p className={"font-bold"}>View</p>
                            <Button
                                className={`${viewType === "grid" ? "bg-primary hover:bg-primary/80 " : "bg-muted-foreground/20 text-black hover:text-white hover:bg-muted-foreground "} `}
                                size="icon"
                                onClick={() => setViewType("grid")}
                            >
                                <LayoutGrid className="h-4 w-4"/>
                            </Button>
                            <Button
                                className={`${viewType === "list" ? "bg-primary hover:bg-primary/80 " : "bg-muted-foreground/20 text-black hover:text-white hover:bg-muted-foreground"} `}
                                size="icon"
                                onClick={() => setViewType("list")}
                            >
                                <List className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>

                    <div
                        className={
                            viewType === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                : "space-y-6"
                        }
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${generateSlug(product.name)}-${product.id}`} passHref>
                                <div
                                    className={`bg-background rounded-lg overflow-hidden shadow-md ${
                                        viewType === "list" ? "flex gap-6" : ""
                                    }`}
                                >
                                    <div className={viewType === "list" ? "w-1/3" : "relative pt-[100%]"}>
                                        <Image
                                            src={product.product_images[0].image}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col gap-2">
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <p className="text-muted-foreground">{product.brand.name}</p>
                                        <div className={"flex justify-between"}>
                                            <p className="text-xl font-bold text-secondary">${product.price.toLocaleString()}</p>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToWishlist(product.id).then()}}
                                                className="mt-2 bg-transparent ring-transparent text-black h-6 shadow-none hover:text-secondary hover:bg-transparent">

                                                Add to Wishlist
                                                <Plus className="mr-2 h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onPrevPage()}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="h-4 w-4"/>
                        </Button>
                        <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onNextPage()}
                            disabled={currentPage >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}