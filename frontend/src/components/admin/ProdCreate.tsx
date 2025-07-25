import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Option } = Select;

function ProdCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // 📦 Load brand & category từ BE (json-server)
  useEffect(() => {
    const fetchData = async () => {
      const [brandRes, categoryRes] = await Promise.all([
        axios.get("http://localhost:3000/brands"),
        axios.get("http://localhost:3000/categories"),
      ]);
      setBrands(brandRes.data);
      setCategories(categoryRes.data);
    };
    fetchData();
  }, []);

  // 📤 Gửi request tạo product
  const addProduct = async (values: any) => {
    return await axios.post("http://localhost:3000/products", {
      ...values,
      stock: 0,
      status: "available",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      navigate("/products"); // 🔄 Điều hướng về danh sách sản phẩm
    },
    onError: () => {
      message.error("Thêm sản phẩm thất bại!");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Thêm sản phẩm mới
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { min: 3, message: "Tối thiểu 3 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá" },
            { type: "number", min: 0, message: "Giá phải ≥ 0" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Nhập giá sản phẩm"
          />
        </Form.Item>

        <Form.Item
          label="Ảnh (thumbnail)"
          name="thumbnail"
          rules={[{ required: true, message: "Nhập URL ảnh" }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((cat: any) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Thương hiệu"
          name="brandId"
          rules={[{ required: true, message: "Chọn thương hiệu" }]}
        >
          <Select placeholder="Chọn thương hiệu">
            {brands.map((b: any) => (
              <Option key={b.id} value={b.id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProdCreate;
