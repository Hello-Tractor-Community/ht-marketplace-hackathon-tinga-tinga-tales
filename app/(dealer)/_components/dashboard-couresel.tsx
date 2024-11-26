'use client'

import React, {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area";
import {AnimatePresence, motion} from "framer-motion";
import {Avatar} from "@/components/ui/avatar";

const messages = Array(10).fill(null).map((_, i) => ({
    id: i,
    name: 'Ephraim Shikanga',
    message: 'Hi Confirming ...',
    time: '2 mins ago'
}))

const bids = Array(10).fill(null).map((_, i) => ({
    id: i,
    name: 'John Doe',
    item: 'Vintage Watch',
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    time: '5 mins ago'
}))

export default function DashboardCarousel() {
    const [showMessages, setShowMessages] = useState(true)
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setShowMessages(prev => !prev)
        }, 10000) // Switch every 5 seconds
        return () => clearInterval(interval)
    }, [])

    // Determine number of items to show based on screen size
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
            <Card className={"h-full "}>
                <CardHeader>
                    <CardTitle className={"text-secondary"}>{showMessages ? "Recent Messages" : "Recent Bids"}</CardTitle>
                </CardHeader>
                <ScrollArea className="h-[calc(100%-4rem)] overflow-y-auto">
                    <CardContent>
                        <AnimatePresence mode="wait">
                            {showMessages ? (
                                <motion.div
                                    key="messages"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    {getVisibleItems(messages).map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{duration: 0.3}}
                                            className="flex items-center gap-4 mb-4"
                                        >
                                            <Avatar>
                                                <div className="w-10 h-10 rounded-full bg-primary/10"/>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-semibold">{message.name}</h4>
                                                    <span
                                                        className="text-xs text-muted-foreground">{message.time}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{message.message}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="bids"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    {getVisibleItems(bids).map((bid) => (
                                        <motion.div
                                            key={bid.id}
                                            initial={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{duration: 0.3}}
                                            className="flex items-center gap-4 mb-4"
                                        >
                                            <Avatar>
                                                <div className="w-10 h-10 rounded-full bg-primary/10"/>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm text-[rgb(22,22,22)] font-semibold">{bid.name}</h4>
                                                    <span className="text-xs text-muted-foreground">{bid.time}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{bid.item} - {bid.amount}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </ScrollArea>
            </Card>
        </motion.div>
    )
}