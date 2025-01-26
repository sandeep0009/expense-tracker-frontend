import { categories } from "@/lib/category";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";


export const CreateExpense=()=>{
    return(
        <div className="bg-gray-500 w-full">
            <div className="w-full max-w-md shadow-lg bg-white ">
                <div>
                    <h2 className="text-2xl font-bold">Add Expense</h2>
                    <p className="text-xs text-slate-500">Add all your expenses here</p>
                </div>
                <div className="mb-4">
                    <Input 
                    placeholder="enter name of transaction"
                    />
                </div>
                <div className="mb-4">
                <Select>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Select number of days" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {
                                    categories.map((item)=>(
                                        <SelectItem value={item}>{item}</SelectItem>

                                    ))
                                }
                            </SelectContent>
                        </Select>
                    
                </div>

                <div className="mb-4">
                    <Input
                    placeholder="enter spent money"
                    />

                </div>

                <div>
                    <Button>Create Expense</Button>
                </div>

            </div>

        </div>
    )
}