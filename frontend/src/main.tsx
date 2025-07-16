// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import Router from "./router";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={Router} />
//       <ToastContainer />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);