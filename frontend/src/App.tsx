import ProdList from "./components/admin/ProdList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import CategoryList from "./components/admin/CategoryList";
import BrandList from "./components/admin/BrandList";
import UserList from "./components/admin/UserList";
import OrderList from "./components/admin/OrderList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import ProdDetail from "./pages/ProdDetail";

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
    path: "/product/detail/productId",
    element: <ProdDetail />,
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProdList />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
