// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Outlet } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Outlet/>
//     <ToastContainer/>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import ProdList from "./components/admin/ProdList";
import "./App.css";
import CategoryList from "./components/admin/CategoryList";
import BrandList from "./components/admin/BrandList";
import UserList from "./components/admin/UserList";
import OrderList from "./components/admin/OrderList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Trang chủ</h1>,
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

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
