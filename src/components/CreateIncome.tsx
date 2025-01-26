
import { FC, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import {  useSelector } from "react-redux";
import { RootState } from "@/store/store"; 
import { sourceItem } from "../lib/source";

interface CreateIncomeProps {
  onClose: () => void;
}

export const CreateIncome: FC<CreateIncomeProps> = ({ onClose }) => {
  const [amount, setamount] = useState("");
  const [source, setsource] = useState("");
  const { toast } = useToast();
  const token = useSelector((state: RootState) => state.user.token);
  const handleAddExpense = async () => {

    try {
      const res = await axiosInstance.post(
        "/create-income",
        { amount,source },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        toast({
          title: "Expense Created Successfully",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create expense.",
        variant: "destructive",
      });
      console.error("Error creating expense:", error);
    }
  };
  

  return (
    <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
      >
        ✕
      </button>

      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold">Add Income</h2>
        <p className="text-xs text-slate-500 py-2">Add your all income you wana track.</p>
      </div>

      <div className="mb-4">
        <Input
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4">
        <Select onValueChange={setsource}>
          <SelectTrigger id="source">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent position="popper">
            {sourceItem.map((item:any) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button
          className="px-6 py-2"
          onClick={handleAddExpense} 
        >
          Create Expense
        </Button>
      </div>
    </div>
  );
};
