import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export const Budegt=()=>{
    return (
        <div className="max-w-2xl md:max-w-4xl mx-auto mt-6 ">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Budegt</h2>
                </div>
                <div>
                    <Button>
                        <span><Plus/></span>
                        New Budegts
                    </Button>
                </div>

            </div>

        </div>
    )
}