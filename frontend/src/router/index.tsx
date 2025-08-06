// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import ProdList from "../pages/admin/ProdList";
import ProdAdd from "../pages/admin/ProdAdd";
import OrderList from "../pages/admin/OrderList";
import CategoryList from "../pages/admin/CategoryList";
import BrandList from "../pages/admin/BrandList";
import UserList from "../pages/admin/UserList";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProdEdit from "../pages/admin/ProdEdit";
import ProdDetail from "../pages/admin/ProdDetail";
import Dashboard from "../pages/admin/DashBoard";
import CategoryAdd from "../pages/admin/CategoryAdd";
import CategoryEdit from "../pages/admin/CategoryEdit";
import Home from "../pages/admin/Home";
import ProdDemo from "../pages/admin/ProdDemo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/products/detail/:id", element: <ProdDetail /> },
  {
    path:"/products",
    element: <ProdDemo/>
  },
{
  path: "/admin",
  element: <ProtectedRoute />, // Check login
  children: [
    {
      element: <AdminLayout />, // Layout admin
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products", element: <ProdList /> },
        { path: "products/add", element: <ProdAdd /> },
        { path: "products/edit/:id", element: <ProdEdit /> },
        { path: "orders", element: <OrderList /> },
        { path: "categories", element: <CategoryList /> },
        { path: "categories/add", element: <CategoryAdd /> },
        { path: "categories/edit/:id", element: <CategoryEdit /> },
        { path: "brands", element: <BrandList /> },
        { path: "users", element: <UserList /> },
      ]
    }
  ]
}
]);
export default router;
