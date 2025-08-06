import { Table, Image, Button, Popconfirm, message, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import { Footer, Header } from "antd/es/layout/layout";
import useAuthStore from "../../stores/useAuthStore";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProdDemo() {
    const navigate= useNavigate();
    const { token, user, logout } = useAuthStore();
  const { data, isLoading, error, refetch } = useList<Product>("products");
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string) => (
        <Link to={`/products/detail/${id}`}>#{id}</Link>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      render: (src: string) => (
        <Image
          src={src}
          width={100}
          fallback="https://via.placeholder.com/120x80?text=No+Image"
        />
      ),
    },
  ];

  return (
<Layout style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#001529",
        }}
      >
        
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
          MekaPlay
        </div>
        <div>
          {!token ? (
            <>
              <Button type="primary" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </Button>
            </>
          ) : (
            <>
              <span style={{ color: "#fff", marginRight: 10 }}>
                Xin chào, {user?.name || "Admin"}
              </span>
              <Button danger onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          )}
        </div>
        </Header>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
      {/* FOOTER */}
      <Footer style={{ textAlign: "center" }}>
        MekaPlay ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  );
}


