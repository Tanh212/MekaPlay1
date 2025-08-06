import {
  Button,
  Form,
  Input,
  message,
  Spin,
  Typography,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const { Title } = Typography;


function CategoryEdit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {id} = useParams();

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/categories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

    const updatecategory = async (values: any) => {
    return await axios.put(`http://localhost:3000/categories/${id}`, {
      ...values,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updatecategory,
    onSuccess: () => {
      message.success("Cập nhật thành công!");
      navigate("/admin/categories");
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <Title level={3}>Sửa danh mục</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục" },
            { min: 2, message: "Tối thiểu 2 ký tự" },
          ]}
        >
          <Input placeholder="Danh mục" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            Sửa danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryEdit;
