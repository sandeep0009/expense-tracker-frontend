import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

export const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const router = useNavigate();

  useEffect(() => {
    if (!token) {
      router("/signin");
    }
  }, [token]);
 

  return <Component />;
};
