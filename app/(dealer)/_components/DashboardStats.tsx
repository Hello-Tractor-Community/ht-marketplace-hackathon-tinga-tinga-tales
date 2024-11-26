import React from "react";
import {DollarSign, ShoppingBag, Timer, User} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
export interface QuickStats {
    title: string;
    value: string;
    percentage: string;
    icon: number;
}



export default function DashboardStats({ quickStats } : { quickStats: QuickStats[] }) {
    const icons = {
        1: DollarSign,
        2: User,
        3: ShoppingBag,
        4: Timer,
    };

    return (
        <motion.div
            className="grid gap-2 grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {quickStats.map((stat, index) => {
                const Icon = icons[stat.icon as keyof typeof icons];
                return (
                    <motion.div key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-secondary">${stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.percentage} from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}