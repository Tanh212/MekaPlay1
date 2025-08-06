import { Button, Form, Input, InputNumber, Select, message } from "antd";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useList } from "../hooks/useList";
import { useAdd } from "../hooks/useAdd";

function ProdAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createMutation = useAdd("products");

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const { data: brands } = useList<{ id: string; name: string }>("brands");
  const { data: categories } = useList<{ id: string; name: string }>("categories");

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        message.success("Thêm danh mục thành công");
        form.resetFields();
        navigate("/categories");
      },
      onError: () => {
        message.error("Thêm danh mục thất bại");
      },
    });
  };

  return (
    <div className="mt-6 max-w-[800px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Thêm danh mục</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        onValuesChange={(changed) => {
          if (changed.thumbnail) setThumbnailPreview(changed.thumbnail);
        }}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục" },
            { min: 3, message: "Tên quá ngắn (ít nhất 3 ký tự)" },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

      
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
          >
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProdAdd;
