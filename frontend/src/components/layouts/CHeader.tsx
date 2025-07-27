// import React from "react";
// import {
//   HomeOutlined,
//   ShopFilled,
//   UnorderedListOutlined,
//   UserOutlined,
//   TagsOutlined,
//   ShoppingCartOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Menu } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";

// type MenuItem = Required<MenuProps>["items"][number];

// const items: MenuItem[] = [
//   {
//     label: "Trang chủ",
//     key: "/",
//     icon: <HomeOutlined />,
//   },
//   {
//     label: "Sản phẩm",
//     key: "/products",
//     icon: <ShopFilled />,
//   },
//   {
//     label: "Tạo sản phẩm",
//     key: "/products/add",
//     icon: <ShopFilled />,
//   },
//   {
//     label: "Danh mục",
//     key: "/categories",
//     icon: <UnorderedListOutlined />,
//   },
//   {
//     label: "Thương hiệu",
//     key: "/brands",
//     icon: <TagsOutlined />,
//   },
//   {
//     label: "Đơn hàng",
//     key: "/orders",
//     icon: <ShoppingCartOutlined />,
//   },
//     {
//     label: "Đăng kí",
//     key: "/register",
//     icon: <UserOutlined />,
//   },
// ];

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const onClick: MenuProps["onClick"] = (e) => {
//     navigate(e.key);
//   };

//   return (
//     <Menu
//       onClick={onClick}
//       selectedKeys={[location.pathname]}
//       mode="horizontal"
//       items={items}
//     />
//   );
// };

// export default Header;
