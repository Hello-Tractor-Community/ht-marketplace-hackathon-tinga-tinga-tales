'use client';
import Banner from "@/components/sections/HeroesSection";
import ProductListing from "@/components/sections/ProductListing";
import * as React from "react";
import {startTransition, useState} from "react";
import {fetchListingsAction} from "@/app/actions/listings/get-approved-listings";

export default function HomeProducts() {

    const [listings, setListings] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);


    const fetchPageData = async (page: number) => {
        startTransition(async () => {
            const {data, totalPages} = await fetchListingsAction( page, 6);
            setListings(data);
            setTotalPages(totalPages);
        });
    };
    useState(() => {
        fetchPageData(1).then();
    });

    return (
        <div className={"flex flex-col justify-between"}>
            <Banner/>
            <ProductListing products={listings} totalPages={totalPages} getPageProducts={fetchPageData}/>
        </div>
    )
}