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

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/product/detail/:id", element: <ProdDetail /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ProdList /> },
      { path: "products", element: <ProdList /> },
      { path: "products/add", element: <ProdAdd /> },
      
      { path: "products/edit/:id", element: <ProdEdit /> },
      { path: "orders", element: <OrderList /> },
      { path: "categories", element: <CategoryList /> },
      { path: "brands", element: <BrandList /> },
      { path: "users", element: <UserList /> },
    ],
  },
]);

export default router;
