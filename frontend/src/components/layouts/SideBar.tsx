import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TagsOutlined,
  AppstoreOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const items = [
  { label: "Dashboard", key: "/", icon: <HomeOutlined /> },
  { label: "Sản phẩm", key: "/products", icon: <AppstoreOutlined /> },
  { label: "Đơn hàng", key: "/orders", icon: <ShoppingCartOutlined /> },
  { label: "Khách hàng", key: "/users", icon: <UserOutlined /> },
  { label: "Danh mục", key: "/categories", icon: <TagsOutlined /> },
  { label: "Thống kê", key: "/statistic", icon: <BarChartOutlined /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onClick={(info) => navigate(info.key)}
    />
  );
}
