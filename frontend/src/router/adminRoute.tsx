import AdminLayout from "../components/admin/AdminLayout";
import ProdList from "../pages/admin/ProdList";
import Dashboard from "../pages/admin/DashBoard";
import CategoryList from "../pages/admin/CategoryList";
import UserList from "../pages/admin/UserList";
import OrderList from "../pages/admin/OrderList";
import BrandList from "../pages/admin/BrandList";
import ProdAdd from "../pages/admin/ProdAdd";
import { Navigate } from "react-router-dom";
import ProdEdit from "../pages/admin/ProdEdit";


export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/admin/products" />,
    },
    { index: true, element: <Dashboard /> },
    { path: "products", element: <ProdList /> },
    { path: "categories", element: <CategoryList /> },
    { path: "users", element: <UserList/> },
    { path: "orders", element: <OrderList /> },
    { path: "brands", element: <BrandList /> },
    { path: "products/add", element: <ProdAdd /> },
    { path: "products/edit/:id", element: <ProdEdit /> },
  ],
};
