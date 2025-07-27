// src/router/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/auth";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
