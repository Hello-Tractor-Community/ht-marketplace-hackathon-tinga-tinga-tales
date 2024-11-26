"use client";
import React, {useEffect, useState} from "react";
import {QuickStats} from "@/app/(dealer)/_components/DashboardStats";
import {getQuickStats} from "@/app/(dealer)/actions/dashboard-actions";
import DashboardChart from "@/app/(dealer)/_components/dashboard-chart";
import DashboardTable from "@/app/(dealer)/_components/dashboard-table";
import DashboardCarousel from "@/app/(dealer)/_components/dashboard-couresel";
import DashboardStats from "@/app/(dealer)/_components/DashboardStats";

const DashBoard: React.FC = () => {
    const [quickStats, setQuickStats] = useState<QuickStats[]>([]);

    useEffect(() => {
        async function fetchQuickStats() {
            try {
                const stats = await getQuickStats();
                setQuickStats(stats);
            } catch (error) {
                console.error("Failed to fetch quick stats:", error);
            }
        }

        fetchQuickStats().then();
    }, []);

    return (
        <div className="h-full w-full p-2 space-y-4">
            <DashboardStats quickStats={quickStats} />
            <DashboardChart />
            <div className="h-[calc(100vh-25rem)] lg:h-[calc(100vh-34rem)] xl:h-[calc(100vh-33rem)] 2xl:h-[calc(100vh-45.5rem)] grid grid-cols-1 lg:grid-cols-2 gap-2 lg:pb-2 xl:pb-0">
                <DashboardTable />
                <DashboardCarousel />
            </div>
        </div>
    );
}

export default DashBoard