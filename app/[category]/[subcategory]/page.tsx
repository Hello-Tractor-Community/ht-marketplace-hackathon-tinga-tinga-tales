'use client';
import {startTransition, useState} from "react";
import {getSubCategoryProductsAction} from "@/app/actions/listings/get-subcategory-products";
import ProductListing from "@/components/sections/ProductListing";


export default function SubCategoryPage({ params } : { params: { subcategory: string } }) {
    const subcategory = decodeURIComponent(params.subcategory);
    const [listings, setListings] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);


    const fetchPageData = async (page: number) => {
        startTransition(async () => {
            const {data, totalPages} = await getSubCategoryProductsAction( subcategory ,page, 12);
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