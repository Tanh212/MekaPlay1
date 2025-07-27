// // src/components/admin/Sidebar.tsx
// import { Layout, Menu } from "antd";
// import {
//   DashboardOutlined,
//   AppstoreOutlined,
//   ShoppingOutlined,
//   UserOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { useNavigate, useLocation } from "react-router-dom";

// const { Sider } = Layout;

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
//     { key: "/admin/products", icon: <AppstoreOutlined />, label: "Sản phẩm" },
//     { key: "/admin/orders", icon: <ShoppingOutlined />, label: "Đơn hàng" },
//     { key: "/admin/users", icon: <UserOutlined />, label: "Người dùng" },
//     { key: "/logout", icon: <LogoutOutlined />, label: "Đăng xuất" },
//   ];

//   return (
//     <Sider breakpoint="lg" collapsedWidth="0">
//       <div className="text-white text-xl font-bold text-center py-4">🛒 MekaPlay</div>
//       <Menu
//         theme="dark"
//         mode="inline"
//         selectedKeys={[location.pathname]}
//         items={menuItems}
//         onClick={({ key }) => navigate(key)}
//       />
//     </Sider>
//   );
// };

// export default Sidebar;
  