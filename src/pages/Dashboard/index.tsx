import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecentTransaction } from "@/components/RecentTransaction";
import { SpendingOverView } from "@/components/SpendingOverview";
import { CreateExpense } from "@/components/CreateExpense";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomCardCustom } from "@/components/CustomCard";

export const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dashboardData, setIncomeDashboard] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const token = useSelector((state: RootState) => state.user.token);

  const handleAdd = () => {
    setIsExpenseModalOpen(true);
  };

  const handleClose = () => {
    setIsExpenseModalOpen(false);
  };

  const getDashboardDetails = async () => {
    const res = await axiosInstance.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIncomeDashboard(res.data.resultArray);
  };


  const getFilterTransaction = async () => {
    const res = await axiosInstance.get(`/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransactions(res.data.result.transactions);

  };

  useEffect(() => {
    getDashboardDetails();
    getFilterTransaction();
  }, []);

  return (
    <div>
      <div className="max-w-2xl md:max-w-4xl mx-auto">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
          </div>

          <div>
            <Button
              className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base flex items-center space-x-2"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Add Expense</span>
            </Button>
          </div>
        </div>

        <div className=" mt-6">
          <Card>

            <CardContent>
              <CardHeader>
                <h2 className="text-lg font-semibold">Expense Overview</h2>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {dashboardData.length > 0 && dashboardData[0] && dashboardData[3] && dashboardData[2] && (
                  <>
                    <div className="border p-4 rounded-lg">
                      <CustomCardCustom title="Total Balance" value={dashboardData[0]?.value || 0} percentage={dashboardData[4]?.value || 0} color="text-green-600" />
                    </div>
                    <div className="border p-4 rounded-lg">
                      <CustomCardCustom title="Monthly Expenses" value={dashboardData[3]?.value || 0} percentage={dashboardData[7]?.value || 0} color="text-red-600" />
                    </div>
                    <div className="border p-4 rounded-lg">
                      <CustomCardCustom title="Savings" value={dashboardData[2]?.value || 0} percentage={dashboardData[6]?.value || 0} color="text-green-600" />
                    </div>
                  </>
                )}


              </CardContent>
            </CardContent>


          </Card>

        </div>

        <div>
          <RecentTransaction />
        </div>

        <div className="mt-8">
          <SpendingOverView />
        </div>
      </div>

      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateExpense onClose={handleClose} />
        </div>
      )}
    </div>
  );
};


