import {
  Button,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface BrandFormValues {
  name: string;
}

function BrandAdd() {
  const [form] = Form.useForm<BrandFormValues>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: BrandFormValues) =>
      axios.post("http://localhost:3000/brands", values),
    onSuccess: () => {
      message.success("Đã thêm thương hiệu!");
      navigate("/admin/brands"); // Điều hướng sau khi thêm thành công
    },
    onError: () => {
      message.error("Thêm thương hiệu thất bại!");
    },
  });

  const handleSubmit = (values: BrandFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <Title level={3}>Thêm thương hiệu mới</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên thương hiệu" },
            { min: 2, message: "Tối thiểu 2 ký tự" },
          ]}
        >
          <Input placeholder="thương hiệu" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
          >
            Thêm thương hiệu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BrandAdd;
