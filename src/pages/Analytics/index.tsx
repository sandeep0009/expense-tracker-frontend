import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axiosInstance";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Analytics = () => {
    const [spendingTrends, setSpendingTrends] = useState([]);
    const [analyticsData, setAnalyticsData] = useState({
        totalSpending: 0,
        averageDailySpending: 0,
        topCategory: { category: "N/A", percentage: 0 },
        totalTransactions: 0,
    });
    const [selectedPeriod, setSelectedPeriod] = useState("30");
    const [viewMode, setViewMode] = useState("daily");
    const token = useSelector((state: RootState) => state.user.token);
    const [categories, setCategories] = useState([]);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

    const getQueryString = () => {
        let query = `timeRange=${selectedPeriod}&viewMode=${viewMode}`;
        return query;
    };

    const fetchAnalytics = async () => {
        try {
            const res = await axiosInstance.get(`/analytics?timeRange=${selectedPeriod}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAnalyticsData(res.data.result);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    const fetchSpendingTrends = async () => {
        try {
            const query = getQueryString();
            const res = await axiosInstance.get(`/get-spending-trends?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSpendingTrends(res.data.spendingTrends);
        } catch (error) {
            console.error("Error fetching spending trends:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get(`/category-distribution`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchAnalytics();
        fetchSpendingTrends();
        fetchCategories();
    }, [selectedPeriod, viewMode]);

    return (
        <div className="max-w-2xl md:max-w-4xl mx-auto mt-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Transaction</h2>
                <div>
                    <Select onValueChange={(value) => setSelectedPeriod(value)}>
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
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Spending Overview</h2>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-sm text-gray-500">Total Spending</h3>
                            <p className="text-xl font-bold">${analyticsData.totalSpending.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-sm text-gray-500">Avg Daily Spending</h3>
                            <p className="text-xl font-bold">${analyticsData.averageDailySpending.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-sm text-gray-500">Top Category</h3>
                            <p className="text-xl font-bold">{analyticsData.topCategory.category}</p>
                            <span className="text-sm text-gray-500">{analyticsData.topCategory.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-sm text-gray-500">Total Transactions</h3>
                            <p className="text-xl font-bold">{analyticsData.totalTransactions}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between gap-4 mt-6">
                <Card className="flex-1">
                    <CardHeader>
                        <div className="flex justify-between">
                            <div>Spending Trends</div>
                            <div className="flex gap-4">
                                {["daily", "weekly", "monthly"].map((mode) => (
                                    <span
                                        key={mode}
                                        className={`cursor-pointer ${viewMode === mode ? "font-bold" : ""}`}
                                        onClick={() => setViewMode(mode)}
                                    >
                                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <div className="p-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={spendingTrends}
                                    dataKey="totalAmount"
                                    nameKey="period"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={(entry) => `${entry.period}: $${entry.totalAmount}`}
                                >
                                    {spendingTrends.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="flex-1">
                    <CardHeader>Category Distribution</CardHeader>
                    <div className="p-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categories.map((category) => ({
                                        name: category,
                                        value: 1,  // Assume each category has equal distribution, adjust based on actual data
                                    }))}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#82ca9d"
                                    label={(entry) => `${entry.name}: ${entry.value}`}
                                >
                                    {categories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
