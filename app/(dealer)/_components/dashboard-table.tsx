"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ScrollArea} from "@/components/ui/scroll-area";

const products = [
    {id: 1, name: 'Denim Jacket', category: "Men's Top", stock: 'In Stock', sales: '1.43k'},
    {id: 2, name: 'Nike Air Max 97', category: "Men's Shoes", stock: 'Out of Stock', sales: '2.68k'},
    {id: 3, name: 'Nike Air Max 97', category: "Men's Shoes", stock: 'Out of Stock', sales: '2.68k'},
    {id: 4, name: 'Classic T-Shirt', category: "Men's Top", stock: 'In Stock', sales: '1.21k'},
    {id: 5, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
    {id: 6, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
    {id: 7, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
    {id: 8, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
    {id: 9, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
    {id: 10, name: 'Running Shorts', category: "Men's Bottom", stock: 'In Stock', sales: '0.95k'},
]

export default function DashboardTable() {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getVisibleItems = (items: any[], defaultCount = 6) => {
        if (windowWidth >= 1536) return items // Show all items on 2xl screens
        return items.slice(0, defaultCount) // Show 3 items on smaller screens
    }

    return (
        <motion.div
            whileHover={{scale: 1.01}}
            whileTap={{scale: 0.98}}
            className={"xl:h-[97%] overflow-y-hidden shadow-md"}
        >
            <Card className={"h-full"}>
                <CardHeader>
                    <CardTitle className={"text-secondary"}>Top selling products</CardTitle>
                </CardHeader>
                <ScrollArea className={"h-full "}>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Total sales</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getVisibleItems(products).map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={product.stock === 'In Stock' ? 'default' : 'destructive'}>
                                                {product.stock}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{product.sales}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </ScrollArea>
            </Card>
        </motion.div>
    );
}