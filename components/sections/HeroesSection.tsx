'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

interface Product {
    id: number
    name: string
    price: number
    image: string
    specs: {
        brand: string
        engine: string
        transmission: string
    }
}

const products: Product[] = [
    {
        id: 1,
        name: "Heavy Duty Tractor X-1000",
        price: 75000,
        image: "/tractors/tractor1.png",
        specs: {
            brand: "Mercedes Benz",
            engine: "4 Cylinder Diesel",
            transmission: "12F/12R",
        },
    },
    {
        id: 2,
        name: "Agricultural Pro T-2000",
        price: 85000,
        image: "/tractors/tractor2.png",
        specs: {
            brand: "Mahindra",
            engine: "6 Cylinder Turbo",
            transmission: "16F/8R",
        },
    },
    {
        id: 3,
        name: "Farm Master 3000",
        price: 95000,
        image: "/tractors/tractor3.png",
        specs: {
            brand: "Kubota",
            engine: "6 Cylinder Intercooled",
            transmission: "24F/24R",
        },
    },
]

import { usePathname } from 'next/navigation';

function CustomBreadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav
            className="mb-4 xl:left-44 bg-background fixed  right-0 w-full top-[3.89rem] z-10  flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto"
            aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground text-base md:text-lg whitespace-nowrap">Home</Link>
            {segments.map((segment, index) => {
                const url = `/${segments.slice(0, index + 1).join('/')}`;
                return (
                    <div key={segment} className="flex items-center">
                        <span>/</span>
                        <Link href={url} className="hover:text-foreground text-base md:text-lg whitespace-nowrap">
                            {decodeURIComponent(segment.replace('-', ' '))}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}


export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(timer)
    }, [currentIndex])

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setCurrentIndex((prev) => (prev + 1) % products.length)
            setTimeout(() => setIsAnimating(false), 500)
        }
    }

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
            setTimeout(() => setIsAnimating(false), 500)
        }
    }

    return (
        <section className="relative w-full min-h-[80vh] md:min-h-[6vh] xl:min-h-[20vh] flex justify-center">
            <div className="container px-4 md:py-8 xl:py-0 md:px-6 lg:px-8">
                {/* Breadcrumb */}
                <CustomBreadcrumb />

                {/* Content */}
                <div className="mt-10 md:mt-10 grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-secondary">
                            {products[currentIndex].name}
                        </h1>
                        <div className="space-y-3 md:space-y-4">
                            <p className="text-2xl md:text-3xl font-semibold text-primary">
                                ${products[currentIndex].price.toLocaleString()}
                            </p>
                            <div className="grid gap-2">
                                <p className="text-base md:text-lg"><strong>Brand:</strong> {products[currentIndex].specs.brand}</p>
                                <p className="text-base md:text-lg"><strong>Engine:</strong> {products[currentIndex].specs.engine}</p>
                                <p className="text-base md:text-lg"><strong>Transmission:</strong> {products[currentIndex].specs.transmission}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/80 w-full sm:w-auto">
                                View Details
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-secondary/40">
                                <Heart className="mr-2 h-5 w-5" />
                                Add to Wishlist
                            </Button>
                        </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative aspect-square p-4 md:p-6 lg:p-10 order-1 md:order-2 m-10">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                />
                            </div>
                        ))}

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute -left-12 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-lg hover:bg-secondary/40"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-12 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-lg hover:bg-secondary/40"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === currentIndex ? "bg-primary" : "bg-gray-300"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}