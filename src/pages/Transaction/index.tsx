import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export const Transaction=()=>{
    return (
        <div className="max-w-2xl md:max-w-4xl mx-auto mt-6 ">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Transaction</h2>
                </div>
                <div>
                    <Button>
                        <span><Plus/></span>
                        New Transactions
                    </Button>
                </div>

            </div>

        </div>
    )
}