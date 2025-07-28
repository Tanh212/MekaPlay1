import { RouterProvider } from "react-router-dom";
import router from "./router"; // 👈 file định nghĩa các route

function App() {
  return <RouterProvider router={router} />;
}

export default App;