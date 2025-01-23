import { Card, CardHeader } from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export const SpendingOverView = () => {
    return (
        <div className="shadow-sm">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Spending Overview</h2>
                    </div>

                    <div>
                        <Select>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Select number of days" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="90days">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </CardHeader>
        </Card>
        </div>
    )
}