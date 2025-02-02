import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { setVerifiedOtp } from "@/slice/userSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(4)
    .max(8)
   ,
});

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = signInSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await axiosInstance.post("/signin", formData);
      console.log(res)
      if (res.status === 200) {
        localStorage.setItem("email", formData.email);
        dispatch(setVerifiedOtp({ verifiedOtp: true }));
        router("/verify-otp");
        toast({
          title: "Sign-in Successful",
          description: "You have successfully signed in.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
      toast({
        title: "Sign-in Failed",
        description: "Invalid credentials, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md px-4 py-6 rounded-xl shadow-lg border">
        <div className="text-center mb-6">
          <h2 className="font-bold text-3xl mb-2">Pocket Pilot</h2>
          <p className="text-sm">Welcome back! Please sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 w-full max-w-md">
          <div className="mb-4">
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4 relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <Button type="submit" className="w-full font-bold py-2 px-4 rounded-lg shadow-md transition-all">
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-black">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
