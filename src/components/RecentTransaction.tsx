import { Menu } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"

export const RecentTransaction=()=>{
    return(
        <div className="mt-8 shadow-sm">
            <Card>
                <CardHeader className="font-bold text-2xl">
                    Recent Transactions
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between sapce-y-8 ">
                        <div className="flex justify-between items-center gap-4">
                            <div className="bg-red-300 rounded-full w-fit">
                                <Menu className="h-5 w-5 text-red-500"/>
                            </div>
                            <div>
                                <h2 className="font-semibold">Groceries</h2>
                                <p className="text-slate-500 text-sm">Today,2:30pm</p>
                            </div>

                        </div>
                        <div>
                            -$120.50
                        </div>


                    </div>
                </CardContent>

            </Card>
        </div>
    )
}