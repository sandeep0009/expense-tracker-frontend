import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface OtpProtectedRouteProp {
  component: React.ComponentType<any>;
}

export const OtpProtectedRoute = ({ component: Component }: OtpProtectedRouteProp) => {
  const otpPending = useSelector((state: RootState) => state.user.verifiedOtp);
  const navigate = useNavigate();
  console.log(otpPending)

  useEffect(() => {
    if (!otpPending) {
      navigate('/signin'); 
    }
  }, [otpPending, navigate]); 

  return  <Component />
};
