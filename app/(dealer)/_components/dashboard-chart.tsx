import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import {getChartData} from "@/app/(dealer)/actions/dashboard-actions";


interface ChartData {
    name: string;
    value1: number;
    value2: number;
}


export default function DashboardChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const data = await getChartData();
                setChartData(data);
            } catch (error) {
                console.error("Failed to fetch chart data:", error);
            }
        }

        fetchChartData().then();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className={"text-secondary"}>Earnings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] xl:h-[400px] 2xl:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value1" stroke="hsl(300 43.28% 26.27%)" />
                            <Line type="monotone" dataKey="value2" stroke="hsl(13.8 100% 60.78%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}