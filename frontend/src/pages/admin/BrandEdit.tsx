// src/pages/BrandEdit.tsx
import { Form, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEdit } from "../hooks/useEdit";
import axios from "axios";

function BrandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const updateMutation = useEdit("brands", id);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/brands/${id}`).then((res) => {
        form.setFieldsValue(res.data);
      });
    }
  }, [id, form]);

  const handleSubmit = (values: any) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        message.success("Cập nhật thương hiệu thành công");
        navigate("/admin/brands");
      },
    });
  };

  return (
    <div className="max-w-[600px] mx-auto mt-6 px-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Sửa thương hiệu</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateMutation.isPending}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BrandEdit;
