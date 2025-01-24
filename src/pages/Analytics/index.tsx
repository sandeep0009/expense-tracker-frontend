import { Card, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const Analytics = () => {
    return (
        <div className="max-w-2xl md:max-w-4xl mx-auto mt-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Transaction</h2>
                </div>
                <div>
                    <Select>
                        <SelectTrigger id="framework">
                            <SelectValue placeholder="Select number of days" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="7days">Last 30 days</SelectItem>
                            <SelectItem value="30days">Last 90 days</SelectItem>
                            <SelectItem value="90days">Last 12 months</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-between gap-4 mt-6">
                <Card className="flex-1">
                    <CardHeader>
                        <div className="flex justify-between">
                            <div>Spending Trends</div>
                            <div className="flex justify-between gap-2 items-center">
                                <ul className="flex gap-4">
                                    <li>Daily</li>
                                    <li>Weekly</li>
                                    <li>Monthly</li>
                                </ul>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader>Category Distribution</CardHeader>
                </Card>
            </div>
            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Spending by Category</h2>
                    </CardHeader>
                    <div className="p-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Total Spent</th>
                                    <th className="py-2">% of Total</th>
                                    <th className="py-2">vs Last Period</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-blue-500"></span> Shopping
                                    </td>
                                    <td className="py-2">$4,250</td>
                                    <td className="py-2">35%</td>
                                    <td className="py-2 text-green-500">+5.2%</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-green-500"></span> Food & Dining
                                    </td>
                                    <td className="py-2">$3,120</td>
                                    <td className="py-2">25%</td>
                                    <td className="py-2 text-red-500">-2.1%</td>
                                </tr>
                                <tr>
                                    <td className="py-2 flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-purple-500"></span> Transportation
                                    </td>
                                    <td className="py-2">$2,450</td>
                                    <td className="py-2">20%</td>
                                    <td className="py-2 text-green-500">+1.8%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
