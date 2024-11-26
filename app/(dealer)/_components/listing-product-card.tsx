'use client'

// import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {MapPin, Trash} from "lucide-react";
import {useState} from "react";
import {deleteListing} from "@/app/(dealer)/actions/listings-actions";
import {useListingsContext} from "@/app/(dealer)/context/listings-context";

export default function ListingProductCard({product, onCardClick, handleBackToList}: {
    product: Product,
    onCardClick?: () => void,
    handleBackToList: () => void
}) {
    const [isHovered, setIsHovered] = useState(false);
    const {listings, setListings} = useListingsContext();

    const handleDelete = async (id: string) => {
        const deletedProduct = await deleteListing(id);
        if (deletedProduct) {
            const updatedListings = listings.filter((product) => product.id !== id);
            console.log(updatedListings);
            setListings(updatedListings);
            if (product.id === id) {
                handleBackToList();
            }
        }
    }

    return (
        <Card
            className="bg-gray-100 dark:bg-white/10 relative w-full border-none shadow-none transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onCardClick}
        >
            <CardContent className={"flex flex-col space-y-2 xl:flex-row xl:space-x-2 p-4"}>
                <div
                    className={"p-2 bg-background/50 dark:bg-background/10 rounded-lg w-full transition-all duration-300 ease-in-out " + (isHovered ? "scale-105" : "")}>
                    {/*<Image src={product.product_images[0].image} alt={"product image"} className={"object-contain w-full"} width={50}*/}
                    {/*       height={50}/>*/}
                </div>
                <div className="flex flex-col p-2 space-y-4 w-full">
                    <div className={"flex flex-row justify-between"}>
                        <h3 className="text-lg font-base ">{product.name}</h3>
                        <div
                            className={"group absolute top-2 right-2 hover:bg-secondary dark:hover:bg-secondary rounded-full bg-background/50 dark:bg-background/10 p-2 transition-all duration-300 ease-in-out"}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(product.id).then(r => r);
                            }}
                        >
                            <Trash
                                className={"text-secondary dark:text-background/10 group-hover:text-background dark:group-hover:text-background transition-colors duration-300"}
                                size={12}/>
                        </div>
                    </div>
                    <div className={"flex flex-row space-x-2"}>
                        <div className={"flex flex-1 space-x-1"}>
                            <MapPin className={"text-primary"} size={16}/>
                            <p className="text-xs text-muted-foreground">{product.location}</p>
                        </div>
                        <div className={"flex flex-1 space-x-1"}>
                            <MapPin className={"text-primary"} size={16}/>
                            <p className="text-xs text-muted-foreground">{product.used_time} {" "} Km</p>
                        </div>
                    </div>
                    <div className={"flex flex-row"}>
                        <span className={"font-bold text-primary "}>Ksh {" "}{product.price}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}