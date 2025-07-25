import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Trang chủ</h1>
      <p>Chào mừng bạn đến với trang chủ của chúng tôi!</p>
      <div style={{ display: "flex", gap: 20 , marginRight: 24}}>
        <Button type="primary" onClick={() => navigate("/products")}>
          Product
        </Button>
        <Button type="primary" onClick={() => navigate("/brands")}>
          Brand
        </Button>
        <Button type="primary" onClick={() => navigate("/categories")}>
          Brand
        </Button>
        <Button type="primary" onClick={() => navigate("/orders")}>
          Brand
        </Button>
      </div>
    </div>
  );
}

export default Home;
