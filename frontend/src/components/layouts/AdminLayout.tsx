import { Layout } from "antd";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <Sidebar />
      </Sider>
      <Layout>
        <Navbar />
        <Content style={{ margin: "24px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
