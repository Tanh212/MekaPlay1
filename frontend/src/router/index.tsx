import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import ProdList from "../components/admin/ProdList";// đường dẫn đúng với cây thư mục của bạn
import Login from "../pages/Login";
import Register from "../pages/Register";
import OrderList from "../components/admin/OrderList";
import CategoryList from "../components/admin/CategoryList";
import BrandList from "../components/admin/BrandList";
import UserList from "../components/admin/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Trang chủ</h1>,
  },
    {
    path: "/login",
    element: <Login />,
  },
    {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/products",
    element: <ProdList />,
  },
  {
    path: "/orders",
    element: <OrderList />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
  {
    path: "/brands",
    element: <BrandList />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
]);

