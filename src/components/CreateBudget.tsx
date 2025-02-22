import { categories } from "@/lib/category";
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

interface CreateBudgetProps {
  onClose: () => void;
}

export const CreateBudget: FC<CreateBudgetProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [spentMoney, setSpentMoney] = useState("");
  const { toast } = useToast();
  const token = useSelector((state: RootState) => state.user.token);
  const handleAddExpense = async () => {

    try {
      const res = await axiosInstance.post(
        "/create-expense",
        { title, category, spentMoney },
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
        <h2 className="text-2xl font-bold">Add Expense</h2>
        <p className="text-xs text-slate-500 py-2">Add all your expenses here</p>
      </div>

      <div className="mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter name of transaction"
        />
      </div>

      <div className="mb-4">
        <Select onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position="popper">
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Input
          value={spentMoney}
          onChange={(e) => setSpentMoney(e.target.value)}
          placeholder="Enter spent money"
        />
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
