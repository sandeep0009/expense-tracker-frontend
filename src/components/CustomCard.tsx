import { Card, CardHeader } from "./ui/card";

interface CustomCardProps {
  title: string;
  percentage: string;
  balance: number;
  date: string;
  color: string; 
}

export const CustomCard = ({ title, percentage, balance, date, color }: CustomCardProps) => {
  return (
    <Card className="p-4 shadow-md rounded-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>{percentage}</div>
        </div>
        <div className="text-2xl font-bold text-gray-800">${balance.toLocaleString()}</div>
        <div className="text-xs text-gray-400 mt-1">{date}</div>
      </CardHeader>
    </Card>
  );
};
