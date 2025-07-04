import { createBrowserRouter } from "react-router-dom";

// Layouts
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages (client)
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

// Pages (admin)
import ProductManager from "../admin/pages/ProductManager";
import OrderManager from "../admin/pages/OrderManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "products", element: <ProductManager /> },
      { path: "orders", element: <OrderManager /> },
    ],
  },
]);

export default router;
