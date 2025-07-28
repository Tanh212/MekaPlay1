import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
} from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const { Option } = Select;

function ProdEdit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  //  Lấy danh mục & thương hiệu
  useEffect(() => {
    const fetchMeta = async () => {
      const [brandRes, categoryRes] = await Promise.all([
        axios.get("http://localhost:3000/brands"),
        axios.get("http://localhost:3000/categories"),
      ]);
      setBrands(brandRes.data);
      setCategories(categoryRes.data);
    };
    fetchMeta();
  }, []);

  // Lấy chi tiết sản phẩm
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Điền dữ liệu vào form sau khi load xong
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  // Gửi request cập nhật sản phẩm
  const updateProduct = async (values: any) => {
    return await axios.put(`http://localhost:3000/products/${id}`, {
      ...values,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      message.success("Cập nhật thành công!");
      navigate("/admin/products");
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
    <div style={{ padding: 24, maxWidth: 700, margin: "auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Cập nhật sản phẩm
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
          label="Mô tả sản phẩm"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả chi tiết sản phẩm" rows={4} />
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
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProdEdit;
