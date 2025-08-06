import { Form, Input, Button } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Password from "antd/es/input/Password";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth("register");

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Đăng ký</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Nhập email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isPending}>
          Đăng ký
        </Button>
      </Form>
    </div>
  );
}

export default Register;
