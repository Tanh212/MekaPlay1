import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const AdminRoute = () => {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />; // Không phải admin thì về trang chủ
  return <Outlet />;
};

export default AdminRoute;