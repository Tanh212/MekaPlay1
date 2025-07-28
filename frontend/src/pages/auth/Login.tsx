import { Button, Card, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore(); // ✅ gọi action từ store

const handleLogin = async (values: { email: string; password: string }) => {
  try {
    const res = await axios.post("http://localhost:3000/login",values);

    setToken(res.data.accessToken); // ✅ cập nhật vào Zustand store
    localStorage.setItem("token", res.data.accessToken);
    message.success("Đăng nhập thành công!");
    if(res.status === 200){
    navigate("/admin");
    }
  } catch (error: any) {
    message.error("Email hoặc mật khẩu không đúng!");
  }
};


  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#141414",
      }}
    >
      <Card style={{ width: 400, background: "#1f1f1f", color: "#fff" }}>
        <Title level={3} style={{ color: "#fff", textAlign: "center" }}>
          Đăng nhập Admin
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
