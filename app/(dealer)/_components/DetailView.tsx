import React, { useState, useEffect } from "react";
import { useCategoriesContext } from "@/context/categories-context";
import { useBrandsContext } from "@/context/brand-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {updateListing} from "@/app/(dealer)/actions/listings-actions";


export default function DetailView({ selectedListing, handleBackToList, isDetailView,  }: {
    selectedListing: Product,
    handleBackToList: () => void,
    isDetailView: boolean
}) {
    const { categories } = useCategoriesContext();
    const { brands } = useBrandsContext();

    const [name, setName] = useState<string>(selectedListing.name);
    const [description, setDescription] = useState<string>(selectedListing.description);
    const [quantityInStock, setQuantityInStock] = useState<number | undefined | null>(selectedListing.quantity_in_stock);
    const [location, setLocation] = useState<string>(selectedListing.location);
    const [price, setPrice] = useState<number>(selectedListing.price);
    const [model, setModel] = useState<string>(selectedListing.model);
    const [usedTime, setUsedTime] = useState<string | undefined | null>(selectedListing.used_time);
    const [year, setYear] = useState<string | undefined | null>(selectedListing.year);
    const [history, setHistory] = useState<string | undefined | null>(selectedListing.history);
    const [selectedBrand, setSelectedBrand] = useState<string>(selectedListing.brand.id);
    const [productImages, setProductImages] = useState<ProductImage[]>(selectedListing.product_images);
    const [selectedCategory, setSelectedCategory] = useState<string>(selectedListing.category!.id);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(selectedListing.sub_category?.id);

    useEffect(() => {
        const category = categories.find(cat => cat.name === selectedCategory);
        setFilteredSubCategories(category ? category.sub_categories || [] : []);
    }, [selectedCategory, categories]);

    useEffect(() => {
        setSelectedCategory(selectedListing.category!.id);
        setSelectedSubCategory(selectedListing.sub_category?.id);
        setName(selectedListing.name);
        setDescription(selectedListing.description);
        setQuantityInStock(selectedListing.quantity_in_stock);
        setLocation(selectedListing.location);
        setPrice(selectedListing.price);
        setModel(selectedListing.model);
        setUsedTime(selectedListing.used_time);
        setYear(selectedListing.year);
        setHistory(selectedListing.history);
        setSelectedBrand(selectedListing.brand.id);
        setProductImages(selectedListing.product_images);
    }, [selectedListing]);

    const handleUpdate = async () => {
        const updatedProduct: Product = {
            id: selectedListing.id,
            owner: selectedListing.owner,
            owner_id: selectedListing.owner_id,
            name,
            status: selectedListing.status,
            description,
            quantity_in_stock: quantityInStock,
            location,
            price,
            model,
            used_time: usedTime,
            year,
            history,
            brand: brands.find(brand => brand.id === selectedBrand)!,
            product_images: productImages,
            category: categories.find(category => category.id === selectedCategory)!,
            sub_category: filteredSubCategories.find(subCategory => subCategory.id === selectedSubCategory),
        };

        const addedProduct = await updateListing(updatedProduct);
        console.log(`Updated Product: ${addedProduct}`);

        console.log(updatedProduct);
    };

    return (
        <div className={`w-full mt-4 h-full xl:mt-0 xl:ml-6 xl:w-1/3 ${isDetailView ? 'block' : 'hidden xl:block'}`}>
            <Card className={"h-full"}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Listing Details</CardTitle>
                    <Button variant="ghost" size="sm" onClick={handleBackToList} className="xl:hidden">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                </CardHeader>
                <ScrollArea className={"h-[calc(100%-10rem)] md:h-[calc(100%-20rem)] xl:h-[calc(100%-10rem)] p-2 pb-20"}>
                    <CardContent>
                        {selectedListing && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="/placeholder-product.jpg" alt={selectedListing.name} />
                                        <AvatarFallback>
                                            <Package className="h-16 w-16" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-medium">{selectedListing.name}</h3>
                                        <p className="text-sm text-muted-foreground">ID: {selectedListing.id}</p>
                                        <p className="text-sm text-muted-foreground">Stock: {selectedListing.quantity_in_stock}</p>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    {/*<div className="grid gap-2">*/}
                                    {/*    <Label htmlFor="seller">Name</Label>*/}
                                    {/*    <Input type={"image"} [id]="seller" onChange={(e) => setName(e.target.value)} value={name}/>*/}
                                    {/*</div>*/}
                                    <div className="grid gap-2">
                                        <Label htmlFor="seller">Name</Label>
                                        <Input id="seller" onChange={(e) => setName(e.target.value)} value={name}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Input className={"cursor-default"} id="status" value={selectedListing.status}
                                               readOnly/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea onChange={(e) => setDescription(e.target.value)} value={description}
                                                  id="description"/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input id="price" type={"number"}
                                               onChange={(e) => setPrice(Number(e.target.value))} value={price}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                            <SelectTrigger id="categories">
                                                <SelectValue placeholder="Select category"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="subcategory">Subcategory</Label>
                                        <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                                            <SelectTrigger id="subCategories">
                                                <SelectValue placeholder="Select subcategory"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredSubCategories.map((subCategory) => (
                                                    <SelectItem key={subCategory.id} value={subCategory.id}>
                                                        {subCategory.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="brand">Brand</Label>
                                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                            <SelectTrigger id="brands">
                                                <SelectValue placeholder="Select brand"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brands.map((brand) => (
                                                    <SelectItem key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="model">Model</Label>
                                        <Input className={"cursor-default"} id="model"
                                               onChange={(e) => setModel(e.target.value)} value={model}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Input className={"cursor-default"} id="year"
                                               onChange={(e) => setYear(e.target.value)} value={year || ''}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="usedTime">Used Time</Label>
                                        <Input className={"cursor-default"} id="usedTime"
                                               onChange={(e) => setUsedTime(e.target.value)} value={usedTime || ''}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="history">History</Label>
                                        <Textarea className={"cursor-default"} id="history"
                                                  onChange={(e) => setHistory(e.target.value)} value={history || ''}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input className={"cursor-default"} id="location"
                                               onChange={(e) => setLocation(e.target.value)} value={location}/>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="ghost"
                                            className={"border border-secondary hover:bg-secondary hover:text-background"}
                                            onClick={handleBackToList}>Cancel</Button>
                                    <Button className={"bg-primary hover:bg-transparent hover:text-black border border-primary"} onClick={handleUpdate}>Update Listing</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </ScrollArea>
            </Card>
        </div>
    );
}