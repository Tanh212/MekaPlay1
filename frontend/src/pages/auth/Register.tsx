//cái này để cho client là khách nha, còn admin chỉ cần login là đủ
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      await axios.post("http://localhost:3000/register", {
        ...values,
        role: "admin", // hoặc "user" tùy ý
      });
      message.success("Đăng ký thành công! Mời bạn đăng nhập.");
      navigate("/login");
    } catch (err: any) {
      message.error("Đăng ký thất bại! Tài khoản đã tồn tại?");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Form onFinish={handleRegister} layout="vertical" style={{ maxWidth: 400, margin: "auto" }}>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Đăng ký</Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
