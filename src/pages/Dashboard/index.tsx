import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomCard } from "@/components/CustomCard";
import { RecentTransaction } from "@/components/RecentTransaction";
import { SpendingOverView } from "@/components/SpendingOverview";

export const Dashboard = () => {
  return (
    <div>
   
        <div className="max-w-2xl md:max-w-4xl mx-auto">
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
            </div>

            <div>
              <Button className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base flex items-center space-x-2">
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                <span>Add Expense</span>
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <CustomCard
            title="Total Balance"
            percentage="+2.5%"
            balance={12}
            date="Updated 1 min ago"
            color="bg-green-100 text-green-600"
            />

          </div>

          <div>
            <RecentTransaction/>

          </div>

          <div className="mt-8">
            <SpendingOverView/>
          </div>
        </div>

    </div>
  );
};
