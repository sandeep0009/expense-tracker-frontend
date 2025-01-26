import { Menu, ShoppingBag, DollarSign, Coffee, Car, TrendingUp, Layers } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { title } from "process";
import { formatDate } from "@/lib/formatTime";

const iconConfig: { [key: string]: { Icon: any; bg: string; color: string } } = {
  Grocery: { Icon: Menu, bg: "bg-purple-300", color: "text-purple-500" },
  Shopping: { Icon: ShoppingBag, bg: "bg-red-300", color: "text-red-500" },
  FoodAndDining: { Icon: Coffee, bg: "bg-orange-300", color: "text-orange-500" },
  Transportation: { Icon: Car, bg: "bg-blue-300", color: "text-blue-500" },
  Deposit: { Icon: DollarSign, bg: "bg-green-300", color: "text-green-500" },
  Investment: { Icon: TrendingUp, bg: "bg-yellow-300", color: "text-yellow-500" },
  Miscellaneous: { Icon: Layers, bg: "bg-gray-300", color: "text-gray-500" },
};

export const RecentTransaction = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const token = useSelector((state: RootState) => state.user.token);

  const getTransactions = async () => {
    const res = await axiosInstance.get("/recent-transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Recet",res)

    setRecentTransactions(res.data.currentTransaction);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  console.log(recentTransactions)
  return (
    <div className="mt-8 shadow-sm">
      <Card>
        <CardHeader className="font-bold text-2xl">Recent Transactions</CardHeader>
        <CardContent>
          {recentTransactions.map((transaction: any, index: number) => {
            const { category, title, createdAt, spentMoney } = transaction;
            const { Icon, bg, color } = iconConfig[category] || iconConfig["Miscellaneous"];
            return (
              <div
                key={index}
                className="flex justify-between items-center space-y-8  py-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`${bg} rounded-full p-2`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-slate-500 text-sm">{formatDate(createdAt)}</p>
                  </div>
                </div>
                <div className={`${spentMoney > 0 ? "text-green-500" : "text-red-500"}`}>
                  {spentMoney > 0 ? `+$${spentMoney}` : `-$${Math.abs(spentMoney)}`}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
