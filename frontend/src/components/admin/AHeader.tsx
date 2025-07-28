// src/components/admin/Header.tsx
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth"; // nếu bạn dùng Zustand

const { Header } = Layout;

const HeaderBar = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore(); // nếu có Zustand

  const handleLogout = () => {
    localStorage.removeItem("token");       // ✅ Xoá token trong localStorage
    setToken(null);                         // ✅ Cập nhật Zustand (nếu dùng)
    navigate("/login", { replace: true });  // ✅ Redirect về login và replace history
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">Tài khoản</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Dropdown overlay={menu}>
        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
