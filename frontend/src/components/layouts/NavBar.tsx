import { Button } from "antd";
import { useAuth } from "../../stores/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: 60,
        backgroundColor: "#001529",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <h3 style={{ color: "white" }}>MekaPlay Admin</h3>
      <Button danger onClick={() => {
        logout();
        navigate("/login");
      }}>
        Đăng xuất
      </Button>
    </div>
  );
}
