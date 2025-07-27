// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { adminRoutes } from "./router/adminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho trang client tạm thời */}
        <Route path="/" element={<div>Trang client (Home)</div>} />

        {/* Route cho admin sử dụng layout và route con */}
        <Route path={adminRoutes.path} element={adminRoutes.element}>
          {adminRoutes.children.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
