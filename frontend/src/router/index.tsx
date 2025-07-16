// import { createBrowserRouter, Router } from "react-router-dom";

// // Layouts
// // import ClientLayout from "../components/layouts/CLientLayout";
// import AdminLayout from "../components/layouts/AdminLayout";

// // Pages (client)
// // import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ProductDetail from "../pages/ProdDetail";
// import Cart from "../pages/Cart";

// // Pages (admin)
// import ProductManager from "../admin/pages/ProductManager";
// import OrderManager from "../admin/pages/OrderManager";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ClientLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "product/:id", element: <ProductDetail /> },
//       { path: "cart", element: <Cart /> },
//     ],
//   },
//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     children: [
//       { path: "products", element: <ProductManager /> },
//       { path: "orders", element: <OrderManager /> },
//     ],
//   },
// ]);

//export default Router;

// import { createBrowserRouter } from 'react-router-dom';
// import ProdList from '../components/admin/ProdList';

// const router = createBrowserRouter([
//   {
//     path: '/admin/products',
//     element: <ProdList />,
//   },
//   {
//     path: '*',
//     element: <div>404 - Page not found</div>, // hoặc dùng NotFound.tsx
//   },
// ]);

// export default router;
