// src/pages/Home.tsx
import { Layout, Menu, Button, Card, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);

  // Lấy demo sản phẩm (ở đây mình lấy từ JSON Server)
  useEffect(() => {
    axios.get("http://localhost:3000/products?_limit=4").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, marginLeft: 20 }}
          items={[
            { key: "home", label: <Link to="/">Trang chủ</Link> },
            { key: "products", label: <Link to="/products">Sản phẩm</Link> },
          ]}
        />
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

      {/* CONTENT */}
      <Content style={{ padding: "20px 50px" }}>
        <h1 style={{ textAlign: "center" }}>Sản phẩm nổi bật</h1>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          {products.map((prod) => (
            <Col xs={24} sm={12} md={6} key={prod.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={prod.name}
                    src={prod.thumbnail}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                onClick={() => navigate(`/products/detail/${prod.id}`)} // ✅ điều hướng
              >
                <Card.Meta
                  title={prod.name}
                  description={`${prod.price} VND`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: "center" }}>
        MekaPlay ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  );
};

export default Home;
