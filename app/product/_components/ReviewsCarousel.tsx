'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const reviews = [
    {
        name: "Kathy Chavez",
        title: "Farmer",
        text: "This tractor has significantly improved our farm's efficiency. It's powerful, fuel-efficient, and the comfort features make long work days much more bearable.",
        image: "/tractors/tractor1.png",
        rating: 5,
    },
    {
        name: "Judy Hoffman",
        title: "Agricultural Contractor",
        text: "I've used many tractors in my career, but this one stands out. The advanced technology and ease of use have made it an invaluable asset to our operations.",
        image: "/tractors/tractor2.png",
        rating: 4,
    },
    {
        name: "Jesse Lucas",
        title: "Vineyard Owner",
        text: "Perfect for our vineyard. The maneuverability and precision controls allow us to work efficiently in tight spaces without damaging our crops.",
        image: "/tractors/tractor3.png",
        rating: 5,
    },
    {
        name: "Mike Johnson",
        title: "Dairy Farmer",
        text: "The fuel efficiency and power of this tractor have greatly improved our daily operations. It handles well even in tough conditions.",
        image: "/tractors/tractor1.png",
        rating: 4,
    },
    {
        name: "Sarah Thompson",
        title: "Organic Farmer",
        text: "I appreciate the eco-friendly features of this tractor. It's helped us maintain our commitment to sustainable farming practices.",
        image: "/tractors/tractor2.png",
        rating: 5,
    },
]

export function ReviewsCarousel() {
    const [currentPage, setCurrentPage] = useState(0)
    const [reviewsPerPage, setReviewsPerPage] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setReviewsPerPage(2)
            } else {
                setReviewsPerPage(3)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalPages = Math.ceil(reviews.length / reviewsPerPage)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
        }, 20000) // Change every 20 seconds

        return () => clearInterval(interval)
    }, [totalPages])

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }

    return (
        <div className="w-full mx-auto relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage).map((review, index) => (
                        <div key={index} className="bg-background p-4 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <Image
                                    src={review.image}
                                    alt={review.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover mr-3"
                                />
                                <div>
                                    <h3 className="text-sm font-semibold">{review.name}</h3>
                                    <p className="text-xs text-muted-foreground">{review.title}</p>
                                </div>
                            </div>
                            <div className="flex space-x-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3 w-3 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs line-clamp-4">{review.text}</p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

        </div>
    )
}