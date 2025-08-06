import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEdit } from "../hooks/useEdit";
import { useList } from "../hooks/useList";
import axios from "axios";

function ProdEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const updateMutation = useEdit("products", id);
  const { data: brands } = useList("brands");
  const { data: categories } = useList("categories");

  // Load product info ban đầu
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/products/${id}`).then((res) => {
        form.setFieldsValue(res.data);
      });
    }
  }, [id, form]);

  const handleSubmit = (values: any) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        message.success("Cập nhật thành công");
        navigate("/admin/products");
      },
    });
  };

  return (
    <div className="max-w-[800px] mx-auto mt-6 px-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Sửa sản phẩm</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Thumbnail"
          name="thumbnail"
          rules={[{ required: true, message: "Nhập link ảnh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thương hiệu"
          name="brandId"
          rules={[{ required: true, message: "Chọn thương hiệu" }]}
        >
          <Select
            options={brands?.map((b) => ({
              value: b.id,
              label: b.name,
            }))}
            placeholder="Chọn brand"
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Chọn danh mục" }]}
        >
          <Select
            options={categories?.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            placeholder="Chọn category"
          />
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

export default ProdEdit;
