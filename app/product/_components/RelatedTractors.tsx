import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface Tractor {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
}

const tractors: Tractor[] = [
    {
        id: 1,
        name: "Pro Farmer 2000X",
        price: 45000,
        image: "/tractors/tractor5.png",
        brand: "John Deere",
    },
    {
        id: 2,
        name: "Compact Master 150",
        price: 30000,
        image: "/tractors/tractor2.png",
        brand: "Kubota",
    },
    {
        id: 3,
        name: "Heavy Duty 4500",
        price: 75000,
        image: "/tractors/tractor1.png",
        brand: "Case IH",
    },
    {
        id: 4,
        name: "AgriGo 900",
        price: 55000,
        image: "/tractors/tractor3.png",
        brand: "New Holland",
    },
    {
        id: 5,
        name: "Farmer Pro X",
        price: 40000,
        image: "/tractors/tractor4.png",
        brand: "Mahindra",
    },
];

export default function RelatedTractors() {
    return (
        <div className="w-full relative">
            <Carousel className="w-full">
                <CarouselContent className="w-[90%] mx-auto flex gap-4">
                    {tractors.slice(0, 6).map((tractor) => (
                        <CarouselItem
                            key={tractor.id}
                            className="flex-shrink-0 w-full md:basis-10/12 lg:basis-1/2 xl:basis-1/4"
                        >
                            <Card className="w-full md:w-96 lg:h-44 flex flex-col md:flex-row shadow-md hover:shadow-lg transition-all duration-300">
                                {/* Image */}
                                <div className="relative h-36 md:h-48  w-full">
                                    <Image
                                        src={tractor.image}
                                        alt={tractor.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                {/* Card Content */}
                                <div className="flex flex-col w-full p-4 items-start">
                                    <CardContent className="p-2">
                                        <h3 className="text-base lg:text-lg font-semibold line-clamp-1">
                                            {tractor.name}
                                        </h3>
                                        <Badge variant="secondary" className="mt-2">
                                            {tractor.brand}
                                        </Badge>
                                    </CardContent>
                                    <CardFooter className="p-2 pt-0 flex flex-col xl:flex-row lg:space-x-3 lg:items-baseline justify-between items-start">
                                        <p className="text-lg lg:text-xl font-bold text-primary mb-2">
                                            ${tractor.price.toLocaleString()}
                                        </p>
                                        <Button className="px-4 py-2 bg-secondary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious className="absolute -left-2 md:left-5 top-1/2 transform -translate-y-1/2 z-10 bg-primary rounded-full shadow-lg p-2 hover:bg-primary/20">
                    <span className="sr-only">Previous</span>
                    &lt;
                </CarouselPrevious>
                <CarouselNext className="absolute -right-2 md:right-0 lg:right-5 top-1/2 transform -translate-y-1/2 z-10 bg-primary rounded-full shadow-lg p-2 hover:bg-primary/20">
                    <span className="sr-only">Next</span>
                    &gt;
                </CarouselNext>
            </Carousel>


        </div>
    );
}
