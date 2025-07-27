import React from "react";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  TagOutlined,
  UserOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/products",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/products">Sản phẩm</Link>,
    },
    {
      key: "/admin/categories",
      icon: <UnorderedListOutlined />,
      label: <Link to="/admin/categories">Danh mục</Link>,
    },
    {
      key: "/admin/brands",
      icon: <TagOutlined />,
      label: <Link to="/admin/brands">Thương hiệu</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
    {
      key: "/admin/orders",
      icon: <CreditCardOutlined />,
      label: <Link to="/admin/orders">Đơn hàng</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      <Header style={{ background: "#001529", padding: "0 20px", display: "flex", alignItems: "center" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>MEKAPLAY ADMIN</div>
      </Header>

      <Layout>
        <Sider width={220} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Admin" },
              { title: location.pathname.split("/")[2] || "Dashboard" },
            ]}
          />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
