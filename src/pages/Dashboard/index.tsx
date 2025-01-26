import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomCard } from "@/components/CustomCard";
import { RecentTransaction } from "@/components/RecentTransaction";
import { SpendingOverView } from "@/components/SpendingOverview";
import { CreateExpense } from "@/components/CreateExpense";
import { axiosInstance } from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination"; 

export const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [incomeDashboard, setIncomeDashboard] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [customRange, setCustomRange] = useState("");
  const [type, setType] = useState("");
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

  const getQueryString = () => {
    let query = `?page=${currentPage}&limit=${rowsPerPage}`;

    if (searchQuery) {
      query += `&search=${encodeURIComponent(searchQuery)}`;
    }
    if (customRange) {
      query += `&range=${encodeURIComponent(customRange)}`;
    }
    if (category) {
      query += `&category=${encodeURIComponent(category)}`;
    }
    if (type) {
      query += `&type=${encodeURIComponent(type)}`;
    }
    return query;
  };

  const getFilterTransaction = async () => {
    const queryString = getQueryString();
    const res = await axiosInstance.get(`/transactions${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("transaction",res)
    setTransactions(res.data.data);
    console.log("trans",transactions)
    setTotalRows(res.data.total);
  };

  useEffect(() => {
    getDashboardDetails();
    getFilterTransaction();
  }, [currentPage, rowsPerPage, searchQuery, category, customRange, type]);

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

        <div className="mt-6">
          {/* <CustomCard
            title="Total Balance"
            percentage={incomeDashboard[4]}
            balance={incomeDashboard[0]}
            date="Updated 1 min ago"
            color="bg-green-100 text-green-600"
          /> */}
        </div>

        <div>
          <RecentTransaction />
        </div>

        <div className="mt-8">
          <SpendingOverView />
        </div>

        <div className="flex gap-4 border border-slate-300 w-full items-center py-4 mt-6 rounded-md px-4">
          <Input
            placeholder="Search transactions..."
            className="w-1/3 border rounded-lg px-3 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-1/4 border rounded-lg px-3 py-2 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setCustomRange(value)}>
            <SelectTrigger className="w-1/4 border rounded-lg px-3 py-2 text-sm">
              <SelectValue placeholder="Custom Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-1/4 border rounded-lg px-3 py-2 text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="all">All Types</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto mt-6">
          <Table className="table-auto border border-collapse rounded-xl w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Date
                </TableHead>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Category
                </TableHead>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Description
                </TableHead>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Amount
                </TableHead>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction:any) => (
                <TableRow>
                  <td className="border px-4 py-2 text-sm">
                    {transaction.createdAt}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {
                      transaction.category
                    }
                   
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {transaction.title}
                  
                  </td>
                  <td className="border px-4 py-2 text-sm">{transaction.spentMoney}</td>
                  <td className="border px-4 py-2 text-sm">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline ml-2">
                      Delete
                    </button>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalRows={totalRows}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
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
