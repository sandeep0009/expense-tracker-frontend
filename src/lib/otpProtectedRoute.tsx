import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


interface OtpProtectedRouteProp{
    component:React.ComponentType<any>
}
export const OtpProtectedRoute=({component:Component}:OtpProtectedRouteProp)=>{
    const otpPending=useSelector((state:RootState)=>state.user.verifiedOtp);
    const router=useNavigate();

    if(!otpPending){
        router('/signin');
    }
    return<Component/>
}