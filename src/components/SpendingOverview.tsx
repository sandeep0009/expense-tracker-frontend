import { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { axiosInstance } from "@/lib/axiosInstance";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

export const SpendingOverView = () => {
    const [days, setDays] = useState("7");
    const token = useSelector((state: RootState) => state.user.token);
    const [spendingData, setSpendingData] = useState([]);
    const [radius, setRadius] = useState(120);
    const [showLabels, setShowLabels] = useState(true);

    const updateChartSize = () => {
        const width = window.innerWidth;
        if (width < 480) {
            setRadius(80);
            setShowLabels(false);
        } else if (width < 768) {
            setRadius(100);
            setShowLabels(true);
        } else {
            setRadius(120);
            setShowLabels(true);
        }
    };

    useEffect(() => {
        getSpendingOverview();
        updateChartSize();
        window.addEventListener("resize", updateChartSize);
        return () => window.removeEventListener("resize", updateChartSize);
    }, [days]);

    const getSpendingOverview = async () => {
        try {
            const res = await axiosInstance.get(`/spending-overview?days=${days}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSpendingData(res.data.formatData);
        } catch (error) {
            console.error("Error fetching spending overview:", error);
        }
    };

    const charData = spendingData.map((item: any) => ({
        name: item.category,
        value: item.totalSpentMoney,
    }));

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="p-4 sm:p-6">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
                            Spending Overview
                        </h2>
                        <Select onValueChange={(value) => setDays(value)}>
                            <SelectTrigger id="framework" className="w-36">
                                <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <div className="flex justify-center py-4">
                    {charData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={charData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={radius}
                                    label={showLabels ? ({ name, value }) => `${name}: Rs ${value}` : false}
                                    labelLine={showLabels}
                                    isAnimationActive={false}
                                    minAngle={10}
                                >
                                    {charData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign={window.innerWidth < 480 ? "bottom" : "top"} height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500">No data available</p>
                    )}
                </div>
            </Card>
        </div>
    );
};
