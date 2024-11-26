'use client';
import {startTransition, useState} from "react";
import {getCategoryProductsAction} from "@/app/actions/listings/get-category-products";
import ProductListing from "@/components/sections/ProductListing";


export default function SubCategoryPage({ params } : { params: { category: string } }) {
    const {category} = params;
    const [listings, setListings] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);


    const fetchPageData = async (page: number) => {
        startTransition(async () => {
            const {data, totalPages} = await getCategoryProductsAction( category ,page, 12);
            setListings(data);
            setTotalPages(totalPages);
        });
    };
    useState(() => {
        fetchPageData(1).then();
    });

    return (
        <ProductListing products={listings} totalPages={totalPages} getPageProducts={fetchPageData}  />
    )
}