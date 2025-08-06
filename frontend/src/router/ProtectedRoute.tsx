import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const ProtectedRoute = () => {
  const token = useAuthStore((s) => s.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
