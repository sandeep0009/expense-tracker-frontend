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

    const getSpendingOverview = async () => {
        try {
            const res = await axiosInstance.get(
                `/spending-overview?days=${days}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSpendingData(res.data.formatData);
        } catch (error) {
            console.error("Error fetching spending overview:", error);
        }
    };

    useEffect(() => {
        getSpendingOverview();
    }, [days]);

    const charData = spendingData.map((item: any) => ({
        name: item.category,
        value: item.totalSpentMoney,
    }));

    return (
        <div className="shadow-sm">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Spending Overview</h2>
                        </div>
                        <div>
                            <Select onValueChange={(value) => setDays(value)}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select number of days" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="7">Last 7 days</SelectItem>
                                    <SelectItem value="30">Last 30 days</SelectItem>
                                    <SelectItem value="90">Last 90 days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <div className="flex justify-center py-6">
                    {charData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={charData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    isAnimationActive={false}
                                >
                                    {charData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>No data found</p>
                    )}
                </div>
            </Card>
        </div>
    );
};
