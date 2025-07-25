import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: values.email,
        password: values.password,
      });

      login(res.data.accessToken); // lưu token vào Zustand + localStorage
      message.success("Đăng nhập thành công!");
      navigate("/"); // chuyển về trang chủ hoặc dashboard
    } catch (err) {
      message.error("Đăng nhập thất bại!");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h2>Đăng nhập</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
