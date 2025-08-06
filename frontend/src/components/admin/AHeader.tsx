// src/components/admin/Header.tsx
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore"; // ✅ đúng tên file store

const { Header } = Layout;

const HeaderBar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout); // ✅ lấy hàm logout từ Zustand

  const handleLogout = () => {
    logout();                 // xoá token + user từ Zustand và localStorage
    navigate("/", { replace: true }); // về Home
  };

  const menu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Tài khoản",
          onClick: () => navigate("/admin/users"),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          onClick: handleLogout,
        },
      ]}
    />
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
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
