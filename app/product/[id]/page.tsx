import Image from "next/image"
import {ArrowLeft} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import MessageComponent from "../_components/MessageComponent"
import {ReviewsCarousel} from "@/app/product/_components/ReviewsCarousel"
import RelatedTractors from "@/app/product/_components/RelatedTractors"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import Header from "@/components/sections/Header";
// import {useParams} from "next/navigation";
import {getProductAction} from "@/app/actions/listings/get-product";

// const product = {
//     name: "John Deere 8R 410",
//     price: 410000,
//     delivery: 15000,
//     mileage: "0 hours",
//     fuelType: "Diesel",
//     brand: "Mercedeze Benz",
//     images: ["/tractors/tractor1.png", "/tractors/tractor3.png", "/tractors/tractor2.png"],
//     description: "The John Deere 8R 410 is a powerful and versatile tractor designed for a wide range of agricultural applications. It features a 410 hp engine, advanced technology, and a comfortable cab to help you work more efficiently and productively. Whether you're plowing fields, planting crops, or hauling heavy loads, the 8R 410 is up to the task. Contact us today to learn more about this impressive tractor.",
//     history: "This tractor has been used for light agricultural tasks and has been well-maintained. It has a clean service record and has been inspected regularly to ensure optimal performance. The previous owner used it primarily for plowing and planting, and it has low hours of operation. The tractor is in excellent condition and is ready to work.",
//     year: 2022,
// }

export default async function ProductPage({ params } : { params: { id: string } }) {
    console.log("Params here: ", params);
    const productSlug = params.id;
    const [, idPart] = productSlug.split("-");


    // Fetch the product data using the ID
    const product = await getProductAction(idPart);
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="h-screen flex flex-col overflow-y-auto md:overflow-hidden">
            <Header/>
            {/* Main Content */}
            <div className="relative flex flex-col md:flex-row gap-6 pt-1 px-4">
                {/* Left Column */}
                <div className="flex-grow space-y-4">
                    <div className="absolute  lg:top-6 xl:top-12 lg:space-x-3 xl:space-y-4">
                        <Link
                            href="/"
                            className="flex items-baseline space-x-2 text-xl text-secondary font-bold hover:text-primary hover:underline hover:underline-offset-8 "
                        >
                            <ArrowLeft className="h-4 w-4"/>
                            <span>Back</span>
                        </Link>
                        <div>
                            <h2 className="md:text-2xl xl:text-4xl font-semibold text-secondary">{product.name}</h2>
                            <p className="text-lg text-zinc-500">{product.year}</p>
                        </div>
                    </div>

                    <div
                        className="relative xl:ml-32 rounded-lg overflow-hidden w-full lg:w-[60vw] h-[40vh] xl:w-[70vw] xl:h-[45vh]">

                        <div className=" xl:ml-32 rounded-lg overflow-hidden ">
                            <Carousel className="w-full h-full">
                                <CarouselContent>
                                    {product.product_images.map((image, index) => (
                                        <CarouselItem key={index} className="">
                                            <div
                                                className="relative w-full lg:w-[60vw] h-[40vh] xl:w-[70vw] xl:h-[45vh] ">
                                                <Image
                                                    src={image.image}
                                                    alt={`Tractor image ${index + 1}`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className={"absolute top-[24rem] left-[40rem] rounded-full "}>
                                    <CarouselPrevious className="bg-primary hover:bg-secondary focus:bg-secondary "/>
                                    <CarouselNext className=" bg-primary hover:bg-secondary focus:bg-secondary"/>
                                </div>
                            </Carousel>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 md:flex-row justify-between">
                        <div className="flex flex-row space-x-3 font-bold">
                            <div>
                                <p className="text-sm text-zinc-500">Price</p>
                                <p className="text-2xl font-semibold text-secondary">
                                    <span className="text-4xl">{product.price.toLocaleString().split(',')[0]}</span>
                                    {product.price.toLocaleString().slice(product.price.toLocaleString().indexOf(','))}
                                </p>
                            </div>
                        </div>
                        <div className="lg:hidden">
                            <Button className="bg-secondary text-background">Contact Seller</Button>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-3">
                        {[
                            {label: "Brand", value: product.brand.name},
                            {label: "Mileage", value: product.brand.id},
                            {label: "Fuel Type", value: product.brand.logo},
                        ].map((item, index) => (
                            <div key={index} className="bg-primary w-40 py-1 px-4 rounded-lg">
                                <p className="text-sm text-[rgba(22,22,22)]">{item.label}</p>
                                <p className="text-xs md:text-sm font-medium">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <Tabs defaultValue="details" className="w-full  h-72  ">
                        <TabsList className="bg-transparent rounded-t-xl mb-0 pl-0 pb-0 h-auto justify-start">
                            <TabsTrigger
                                value="details"
                                className=" rounded-t-xl rounded-b-none border-b-2 shadow-none border-none data-[state=active]:shadow-none data-[state=active]:bg-primary/20 data-[state=active]:rounded-t-xl px-4 py-2"
                            >
                                Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="rounded-t-xl rounded-b-none border-b-2 shadow-none border-none data-[state=active]:shadow-none data-[state=active]:bg-primary/20 data-[state=active]:rounded-t-xl px-4 py-2"
                            >
                                Reviews
                            </TabsTrigger>
                            <TabsTrigger
                                value="related"
                                className="rounded-t-xl rounded-b-none border-b-2 shadow-none border-none data-[state=active]:shadow-none data-[state=active]:bg-primary/20 data-[state=active]:rounded-t-xl px-4 py-2"
                            >
                                Related Products
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-0 pt-0">
                            <Card className="bg-primary/20 border-none shadow-none md:h-52 dark:bg-background rounded-l-none">
                                <CardContent className="p-4 flex flex-col md:flex-row">
                                    <div className="flex flex-col p-2 md:w-1/2">
                                        <p className="text-sm lg:text-lg font-semibold">Description</p>
                                        <p className="text-xs lg:text-sm text-gray-500">{product.description}</p>
                                    </div>
                                    <div className="flex flex-col p-2 md:w-1/2">
                                        <p className="text-sm lg:text-lg font-semibold">History</p>
                                        <p className="text-xs lg:text-sm text-gray-500">{product.history}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-0 pt-0">
                            <Card className="bg-primary/20 border-none shadow-none md:h-52 dark:bg-background rounded-l-none">
                                <CardContent className="p-2 lg:p-4">
                                    <ReviewsCarousel/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="related" className=" mt-0 pt-0">
                            <Card className="bg-primary/20 border-none shadow-none md:h-52 md:max-w-[95vw] lg:w-full dark:bg-background rounded-l-none">
                                <CardContent className="p-2 lg:p-4 w-full">
                                    <RelatedTractors/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Messaging */}
                <div className="hidden lg:block absolute top-10 rounded-lg p-4">
                    <MessageComponent/>
                </div>
            </div>
        </div>
    )
}