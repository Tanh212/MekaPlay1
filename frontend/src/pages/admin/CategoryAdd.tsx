import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdd } from "../hooks/useAdd";

function CategoryAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createMutation = useAdd("categories");

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        form.resetFields();
        setThumbnailPreview("");
        navigate("/admin/categories");
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
            { min: 2, message: "Tên quá ngắn (ít nhất 2 ký tự)" },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          label="Ảnh danh mục"
          name="thumbnail"
          rules={[
            { required: true, message: "Vui lòng nhập link ảnh" },
            { type: "url", message: "Link không hợp lệ" },
          ]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        {thumbnailPreview && (
          <div className="mb-4">
            <img
              src={thumbnailPreview}
              alt="preview"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/150x100?text=No+Image")
              }
              className="max-h-[120px] border rounded object-cover"
            />
          </div>
        )}

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

export default CategoryAdd;
