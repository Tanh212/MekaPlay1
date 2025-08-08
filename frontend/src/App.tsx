import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import AdminRoute from "./router/AdRoute";
import Login from "./pages/auth/Login";
import Home from "./pages/admin/Home";
import Dashboard from "./pages/admin/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* User logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin only */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
