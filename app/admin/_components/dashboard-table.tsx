"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function DashboardTable( {users} : {users: User[]}) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const getVisibleItems = (items: User[], defaultCount = 6) => {
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
                    <CardTitle className={"text-secondary"}>Users</CardTitle>
                </CardHeader>
                <ScrollArea className={"h-full "}>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getVisibleItems(users).map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="font-medium">{user.phone}</TableCell>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.role === 'ADMIN' ? 'destructive' : user.role === 'CUSTOMER' ? 'default' : user.role === 'SELLER' || user.role === 'DEALER' ? 'secondary' : 'outline'}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
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