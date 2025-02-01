import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RecentTransaction } from "@/components/RecentTransaction";
import { CreateExpense } from "@/components/CreateExpense";
import { CustomCardCustom } from "@/components/CustomCard";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

interface DashboardData {
  value: number;
}

export const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [days, setDays] = useState("7");
  const [radius, setRadius] = useState(120);
  const [showLabels, setShowLabels] = useState(true);
  const token = useSelector((state: RootState) => state.user.token);

  const handleAdd = () => setIsExpenseModalOpen(true);
  const handleClose = () => setIsExpenseModalOpen(false);

  const getDashboardDetails = async () => {
    try {
      const res = await axiosInstance.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data.resultArray || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axiosInstance.get("/recent-transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentTransactions(res.data.currentTransaction || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

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

  useEffect(() => {
    getDashboardDetails();
    getTransactions();
    getSpendingOverview();
  }, [days]);

  const handleExpenseCreated = async () => {
    await getTransactions();
    await getSpendingOverview();
    await getDashboardDetails();
  };

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
    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  const chartData = spendingData.map((item: any) => ({
    name: item.category,
    value: item.totalSpentMoney,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
        <Button className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base flex items-center gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Expense</span>
        </Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Expense Overview</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
            {dashboardData.length > 0 && (
              <>
                <div className="border p-4 rounded-lg">
                  <CustomCardCustom title="Total Balance" value={dashboardData[8]?.value || 0} percentage={dashboardData[4]?.value || 0} color="text-green-600" />
                </div>
                <div className="border p-4 rounded-lg">
                  <CustomCardCustom title="Monthly Expenses" value={dashboardData[3]?.value || 0} percentage={dashboardData[5]?.value || 0} color="text-red-600" />
                </div>
                <div className="border p-4 rounded-lg">
                  <CustomCardCustom title="Savings" value={dashboardData[2]?.value || 0} percentage={dashboardData[6]?.value || 0} color="text-green-600" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <RecentTransaction recentTransactions={recentTransactions} onExpenseCreate={handleExpenseCreated} />
      </div>
      <div className="mt-6">
        <Card className="p-4 sm:p-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">Spending Overview</h2>
              <Select value={days} onValueChange={setDays}>
                <SelectTrigger className="w-36">
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
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={radius}
                    label={showLabels ? ({ name, value }) => `${name}: Rs ${value}` : false}
                    labelLine={showLabels}
                    isAnimationActive={false}
                    minAngle={10}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        </Card>
      </div>

      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateExpense onClose={handleClose} onExpenseCreate={handleExpenseCreated} />
        </div>
      )}    </div>
  );
};
