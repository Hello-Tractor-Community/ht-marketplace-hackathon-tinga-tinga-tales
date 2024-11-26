'use server';
import { prisma } from "@/lib/prisma";

export async function getQuickStats() {
    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const currentYear = new Date().getFullYear();
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const totalSales = await prisma.order.aggregate({
        _sum: {
            total: true,
        },
        where: {
            created_at: {
                gte: new Date(`${currentYear}-${currentMonth}-01`),
                lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
            },
        },
    });

    const previousTotalSales = await prisma.order.aggregate({
        _sum: {
            total: true,
        },
        where: {
            created_at: {
                gte: new Date(`${previousYear}-${previousMonth}-01`),
                lt: new Date(`${previousYear}-${previousMonth + 1}-01`),
            },
        },
    });

    const totalCustomers = await prisma.user.count({
        where: {
            role: 'CUSTOMER',
            created_at: {
                gte: new Date(`${currentYear}-${currentMonth}-01`),
                lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
            },
        },
    });

    const previousTotalCustomers = await prisma.user.count({
        where: {
            role: 'CUSTOMER',
            created_at: {
                gte: new Date(`${previousYear}-${previousMonth}-01`),
                lt: new Date(`${previousYear}-${previousMonth + 1}-01`),
            },
        },
    });

    const totalOrders = await prisma.order.count({
        where: {
            created_at: {
                gte: new Date(`${currentYear}-${currentMonth}-01`),
                lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
            },
        },
    });

    const previousTotalOrders = await prisma.order.count({
        where: {
            created_at: {
                gte: new Date(`${previousYear}-${previousMonth}-01`),
                lt: new Date(`${previousYear}-${previousMonth + 1}-01`),
            },
        },
    });

    const totalBids = await prisma.bid.count({
        where: {
            created_at: {
                gte: new Date(`${currentYear}-${currentMonth}-01`),
                lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
            },
        },
    });

    const previousTotalBids = await prisma.bid.count({
        where: {
            created_at: {
                gte: new Date(`${previousYear}-${previousMonth}-01`),
                lt: new Date(`${previousYear}-${previousMonth + 1}-01`),
            },
        },
    });

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return "N/A";
        return ((current - previous) / previous * 100).toFixed(2) + "%";
    };

    return [
        {
            title: "Total Sales",
            value: totalSales._sum.total?.toFixed(2) || "0.00",
            percentage: calculatePercentageChange(totalSales._sum.total || 0, previousTotalSales._sum.total || 0),
            icon: 1,
        },
        {
            title: "Total Customers",
            value: totalCustomers.toString(),
            percentage: calculatePercentageChange(totalCustomers, previousTotalCustomers),
            icon: 2,
        },
        {
            title: "Total Orders",
            value: totalOrders.toString(),
            percentage: calculatePercentageChange(totalOrders, previousTotalOrders),
            icon: 3,
        },
        {
            title: "Total Bids",
            value: totalBids.toString(),
            percentage: calculatePercentageChange(totalBids, previousTotalBids),
            icon: 4,
        },
    ];
}


export async function getChartData() {
    const orders = await prisma.order.findMany({
        select: {
            created_at: true,
            total: true,
        },
    });

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        name: new Date(0, i).toLocaleString('default', { month: 'short' }).toUpperCase(),
        value1: 0,
        value2: 0,
    }));

    orders.forEach(order => {
        const month = new Date(order.created_at).getMonth();
        monthlyData[month].value1 += order.total;
        monthlyData[month].value2 += order.total; // Adjust this if you have different data for value2
    });

    return monthlyData;
}