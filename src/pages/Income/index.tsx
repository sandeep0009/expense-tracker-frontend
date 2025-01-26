import { CreateIncome } from "@/components/CreateIncome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/axiosInstance";
import { RootState } from "@/store/store";
import { Edit, Percent, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

interface IncomeData {
  id: number;
  source: string;
  amount: number;
}

export const Income = () => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const token = useSelector((state: RootState) => state.user.token);

  const handleClose = () => {
    setIsIncomeModalOpen(false);
  };

  const handleAdd = () => {
    setIsIncomeModalOpen(true);
  };

  const getQueryString = () => {
    let query = `?page=${currentPage}&limit=${rowsPerPage}`;

    if (searchQuery) {
      query += `&search=${encodeURIComponent(searchQuery)}`;
    }

    return query;
  };

  const getIncome = async () => {
    try {
      const queryString = getQueryString();
      const res = await axiosInstance.get(`/get-income${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncomeData(res.data.result.data);
    } catch (error) {
      console.error("Failed to fetch income data:", error);
    }
  };

  useEffect(() => {
    getIncome();
  }, [currentPage, rowsPerPage, searchQuery]);

  const filteredData = incomeData.filter((item) =>
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const charData = incomeData.map((item: any) => ({
    name: item.source,
    value: item.amount,
  }));

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Income</h2>
          <Button
            className="px-3 py-1 flex items-center space-x-2"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Create Income</span>
          </Button>
        </div>
        <div className="flex justify-end">
          <Input
            className="mb-4 w-3/6 border rounded-lg px-3 py-2 text-sm"
            placeholder="Search by source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <Table className="table-auto border-collapse border rounded-lg w-full">
            <TableHeader>
              <TableRow className="text-left">
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  S.No.
                </TableHead>
                <TableHead className="border text-sm font-medium text-left px-4 py-2">
                  Source
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
              {paginatedData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="border text-sm text-left px-4 py-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="border text-sm px-4 py-2 break-words">
                    {item.source}
                  </TableCell>
                  <TableCell className="border text-sm text-left px-4 py-2">
                    {item.amount}
                  </TableCell>
                  <TableCell className="border text-sm text-left px-4 py-2">
                    <div className="flex justify-left space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {paginatedData.length === 0 && (
            <div className="text-left text-gray-500 mt-4">No records found</div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600 text-sm">
            Showing {(currentPage - 1) * rowsPerPage + 1} -{" "}
            {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems}{" "}
            results
          </div>
          <div className="flex items-center">
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-28 border rounded-lg text-sm">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 rows</SelectItem>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="15">15 rows</SelectItem>
              </SelectContent>
            </Select>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={rowsPerPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              className="ml-4"
            />
          </div>
        </div>

        <div>
          <div className="p-4">
            <div>
              <h2 className="text-2xl font-bold">Income Insights</h2>
            </div>
            <div className="flex justify-center py-6">
              {charData.length > 0 ? (
             <ResponsiveContainer width="100%" height={400} className="border border-slate-400 rounded-xl">
             <PieChart>
               <Pie
                 data={charData}
                 dataKey="value"
                 cx="50%"
                 cy="50%"
                 outerRadius={150}
                 label={({ name,percent }) => `${name}:(${(percent * 100).toFixed(1)}%)`}
                 isAnimationActive={false}
                 className="w-80%"
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
          </div>
        </div>
      </div>
      {isIncomeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateIncome onClose={handleClose} />
        </div>
      )}
    </>
  );
};
