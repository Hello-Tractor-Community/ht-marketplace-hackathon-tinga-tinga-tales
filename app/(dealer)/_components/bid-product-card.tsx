'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {X, MapPin} from "lucide-react";
import {useState} from "react";

export default function BidProductCard({
                                           product,
                                           bidder,
                                           time,
                                           bid,
                                           onCardClick,
                                           onAccept,
                                           onRemove
                                       }: {
    product: string;
    bidder: string;
    time: string;
    bid: string;
    onCardClick?: () => void;
    onAccept?: () => void;
    onRemove?: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            className="bg-gray-100 relative w-full border-none shadow-none transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onCardClick}
        >
            <CardContent className={"flex flex-row space-x-2 p-4"}>
                <div
                    className={"p-2 bg-background/50 rounded-lg w-full transition-all duration-300 ease-in-out " + (isHovered ? "scale-105" : "")}>
                    <Image src={product} alt={"product image"} className={"object-contain w-full"} width={100}
                           height={100}/>
                </div>
                <div className="flex flex-col p-2 space-y-4 w-full">
                    <div className={"flex flex-row justify-between"}>
                        <h3 className="text-lg font-base ">{bidder}</h3>
                        <div
                            className={"group absolute top-2 right-2 hover:bg-secondary rounded-full bg-background/50 p-2 transition-all duration-300 ease-in-out"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove && onRemove();
                            }}
                        >
                            <X className={"text-secondary group-hover:text-background transition-colors duration-300"}
                               size={12}/>
                        </div>
                    </div>
                    <div className={"flex flex-row space-x-2"}>
                        <div className={"flex flex-1 space-x-1"}>
                            <MapPin className={"text-primary"} size={16}/>
                            <p className="text-xs text-muted-foreground">Juja, Kenya</p>
                        </div>
                        <p className="text-xs">{time}</p>
                    </div>
                    <div className={"flex flex-row space-x-2"}>
                        <span className={"text-muted-foreground"}>New Holland</span>
                    </div>

                    <div className="flex flex-col items-start">
                        <div className={"space-x-1"}>
                            <span className={"text-primary xl:flex-row text-xs"}>Ksh {" "} {bid}</span>
                            <span className={"text-xs text-muted-foreground "}>/</span>
                            <span className={"text-xs"}>Ksh {" "} 1000</span>
                        </div>
                        <Button
                            className={"ml-auto bg-primary/80 hover:bg-primary rounded-full transition-all duration-300 ease-in-out hover:scale-105"}
                            onClick={(e) => {
                                e.stopPropagation();
                                onAccept && onAccept();
                            }}
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}