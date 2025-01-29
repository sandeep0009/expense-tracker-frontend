export const CustomCardCustom = ({ title, value = 0, percentage = 0, color }: { title: string, value: number, percentage: number, color: string }) => {
  return (
    <div className="w-full">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="text-xl font-medium">Rs {value?.toLocaleString()}</div>
      <span className={`text-sm font-medium ${color}`}>{percentage?.toFixed(2)}%</span>
    </div>
  );
};