import ListingProductCard from "@/app/(dealer)/_components/listing-product-card";
import {FilterSelectMenu, SortSelectMenu} from "@/app/(dealer)/_components/select-menus";
import ContentHeader from "@/app/(dealer)/_components/content-header";
import React, {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useListingsContext} from "@/app/(dealer)/context/listings-context";
import {CategoriesProvider} from "@/context/categories-context";
import {BrandsProvider} from "@/context/brand-context";


export default function Listings() {
    const {listings} = useListingsContext();
    const [selectedListing, setSelectedListing] = useState<Product>()
    const [isDetailView, setIsDetailView] = useState(false)
    const handleBackToList = () => {
        setIsDetailView(false)
        setSelectedListing(undefined)
    }

    return (
        <div className={"flex flex-col h-[calc(100vh-5rem)] overflow-y-hidden p-2 space-y-4"}>
            <div className={""}>
                <ContentHeader header={"Listings"} sub={"All Your Products"}/>
                <div className={"w-full flex px-2 space-x-2 justify-end "}>
                    <FilterSelectMenu/>
                    <SortSelectMenu/>
                </div>
            </div>
            <div className={"h-full flex flex-row"}>
                <div className={`flex-grow ${isDetailView ? 'hidden xl:block' : ''}`}>
                    <ScrollArea className="max-h-screen overflow-y-auto">
                        <div
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 ${isDetailView ? "xl:grid-cols-2" : "xl:grid-cols-3"}`}>
                            {listings.map((listing) => (
                                <ListingProductCard
                                    key={listing.id}
                                    product={listing}
                                    onCardClick={() => {
                                        setSelectedListing(listing)
                                        setIsDetailView(true)
                                    }}
                                    handleBackToList={handleBackToList}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <BrandsProvider>
                    <CategoriesProvider>
                        <div>hes</div>
                        {/*{isDetailView && (*/}
                        {/*    <DetailView selectedListing={selectedListing!} handleBackToList={handleBackToList}*/}
                        {/*                isDetailView={isDetailView} onDelete={(id) => console.log(id)}/>*/}
                        {/*)}*/}
                    </CategoriesProvider>
                </BrandsProvider>
            </div>

        </div>
    );
}

