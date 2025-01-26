import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  password?: string;
  email: string;
}

export const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const router=useNavigate();
  const {toast}=useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res=await axiosInstance.post('/signin',{formData});
        if(res.status==201){
            router('/');
            toast({
                title: "Sign-in Successful",
                description: "You have successfully signed in.",
                variant: "default",
              });
            } else {
              toast({
                title: "Sign-in Failed",
                description: "Invalid credentials, please try again.",
                variant: "destructive",
              });
            }
        
    } catch (error) {
        console.log("error",error)
        
    }
  
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-md px-4 py-6 rounded-xl shadow-lg border">
      <div className="text-center mb-6">
        <h2 className="font-bold text-3xl mb-2">Pocket Pilot</h2>
        <p className="text-sm">Welcome back to Pocket Pilot. Please sign up to continue.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" p-6 w-full max-w-md "
      >
        <div className="mb-4">
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg shadow-md transition-all"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};
