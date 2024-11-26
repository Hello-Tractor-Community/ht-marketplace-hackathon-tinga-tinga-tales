'use client'

import {useState} from "react"
// import Link from "next/link"
import {useRouter, usePathname} from 'next/navigation';
import {Slider} from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../ui/accordion"
import {useCategoriesContext} from "@/context/categories-context";


export default function CategorySidebar() {

    const [priceRange, setPriceRange] = useState([20000, 80000])
    const {categories} = useCategoriesContext();


    return (
        <div className={`lg:col-span-1 lg:sticky lg:top-24`}>
            <div className="bg-primary/20 p-6 rounded-lg text-[rgb(22,22,22)]">
                <h2 className="text-2xl font-semibold mb-6 text-[rgb(22,22,22)]">Categories</h2>
                <div className="space-y-2">
                    {
                        categories.map((category) => (
                            <CategoryAccordion key={category.name} category={category}/>
                        ))
                    }
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Filter By</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </label>
                            <Slider
                                defaultValue={[20000, 80000]}
                                max={100000}
                                min={0}
                                step={1000}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="mt-2 "
                            />
                        </div>

                        <div className={"flex items-end space-x-2 border-b border-black pb-1 xl:w-64"}>
                            <p className={"font-bold"}>Brands:</p>
                            <Select defaultValue="name">
                                <SelectTrigger
                                    className="w-[180px] h-6 p-0 m-0 border-none bg-transparent ring-offset-transparent focus:ring-transparent shadow-none underline underline-offset-8">
                                    <SelectValue placeholder="Sort by"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Brands</SelectItem>
                                    <SelectItem value="john-deere">John Deere</SelectItem>
                                    <SelectItem value="kubota">Kubota</SelectItem>
                                    <SelectItem value="case-ih">Case IH</SelectItem>
                                    <SelectItem value="new-holland">New Holland</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className={"flex items-end space-x-2 border-b border-black pb-1 xl:w-64"}>
                            <p className={"font-bold"}>Types:</p>
                            <Select defaultValue="name">
                                <SelectTrigger
                                    className="w-[180px] h-6 p-0 m-0 border-none bg-transparent ring-offset-transparent focus:ring-transparent shadow-none underline underline-offset-8">
                                    <SelectValue placeholder="Sort by"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="compact">Compact</SelectItem>
                                    <SelectItem value="utility">Utility</SelectItem>
                                    <SelectItem value="agricultural">Agricultural</SelectItem>
                                    <SelectItem value="specialty">Specialty</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CategoryAccordion({category}: { category: Category }) {

    const router = useRouter();
    const pathname = usePathname();
    const handleCategoryClick = (category: Category) => {
        router.push(`/${category.name}`);
    };

    const handleSubcategoryClick = (category: Category, subcategory: SubCategory) => {
        router.push(`/${category.name}/${subcategory.name}`);
    };

    return (
        <Accordion type="single" collapsible className="w-full flex justify-between items-center">
            <AccordionItem
                value={category.name} className={"w-full"}>
                <AccordionTrigger
                    disabled={category.sub_categories?.length === 0}
                    className={`${pathname.includes(category.name) ? 'font-bold' : ''} w-full text-lg text-[rgb(22,22,22)] hover:text-secondary transition-colors`}>
                    <span className={""}
                        onClick={() => handleCategoryClick(category)}
                    >

                        {category.name}
                    </span>

                </AccordionTrigger>
                <AccordionContent className={"animate-accordion-down"}>
                    <ul className="ml-4 mt-2 space-y-4">
                        {category.sub_categories?.map((sub) => (
                            <li key={sub.name}>
                                <div
                                    onClick={() => handleSubcategoryClick(category, sub)}
                                    className="text-sm hover:text-secondary transition-colors">
                                    <div className="flex justify-between w-full cursor-pointer items-center">
                                        <span>{sub.name}</span>
                                        <span className="text-secondary cursor-pointer">({sub._count.products})</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}