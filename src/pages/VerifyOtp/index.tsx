import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "@/slice/userSlice";

export const VerifyOtp = () => {
  console.log("otp")
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router=useNavigate();
  const email=localStorage.getItem('email');
  const dispatch=useDispatch();
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index <5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit =async () => {
    const otpValue = otp.join("");
    const res=await axiosInstance.post('/verify-otp',{email,otp:otpValue});
    if(res.status===200){
      localStorage.setItem('token',res.data.token);
      dispatch(setUserId({token:res.data.token}));
        router('/income');

    }
    console.log("OTP Submitted:", otpValue);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full border border-black shadow-lg rounded-lg p-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Pocket Pilot</h2>
        <p className="text-xs text-gray-600">Verify your OTP to proceed</p>
        <div className="flex justify-center gap-2">
          {otp.map((value, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border border-gray-400 rounded-md focus:outline-none "
            />
          ))}
        </div>

        <Button className="w-full mt-4" onClick={handleSubmit} disabled={otp.includes("")}>
          Verify OTP
        </Button>
      </div>
    </div>
  );
};
