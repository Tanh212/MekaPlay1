import { Form, Input, Button } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth("login");

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/admin");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 border rounded-lg bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input type="email" placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isPending}>
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
