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
        message.success("Thêm sản phẩm thành công");
        form.resetFields();
        navigate("/products");
      },
      onError: () => {
        message.error("Thêm sản phẩm thất bại");
      },
    });
  };

  return (
    <div className="mt-6 max-w-[800px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Thêm sản phẩm</h1>

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
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { min: 3, message: "Tên quá ngắn (ít nhất 3 ký tự)" },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá" },
            {
              validator: (_, value) =>
                value >= 1000
                  ? Promise.resolve()
                  : Promise.reject("Giá phải từ 1.000đ trở lên"),
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá sản phẩm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm (thumbnail)"
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

        <Form.Item
          label="Thương hiệu (Brand)"
          name="brandId"
          rules={[{ required: true, message: "Chọn thương hiệu" }]}
        >
          <Select
            placeholder="Chọn thương hiệu"
            options={brands?.map((b) => ({ value: b.id, label: b.name }))}
            loading={!brands}
          />
        </Form.Item>

        <Form.Item
          label="Danh mục (Category)"
          name="categoryId"
          rules={[{ required: true, message: "Chọn danh mục" }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={categories?.map((c) => ({ value: c.id, label: c.name }))}
            loading={!categories}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProdAdd;
