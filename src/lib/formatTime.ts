import { format, isToday, isYesterday } from "date-fns";

export const formatDate=(time:string)=>{
    const date = new Date(time);
    if (isToday(date)) {
      return "Today";
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    return format(date, "dd MMM yyyy");
}