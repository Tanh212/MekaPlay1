import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const { Title } = Typography;

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ProductFormValues {
  name: string;
  price: number;
  thumbnail: string;
  categoryId: number;
  brandId: number;
}

function ProdAdd() {
  const [form] = Form.useForm<ProductFormValues>();
  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // 📦 Load brands & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3000/brands"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setBrands(brandRes.data);
        setCategories(categoryRes.data);
      } catch {
        message.error("Không tải được dữ liệu danh mục / thương hiệu");
      }
    };
    fetchData();
  }, []);

  // 📤 Gửi request tạo sản phẩm mới
  const mutation = useMutation({
    mutationFn: (values: ProductFormValues) =>
      axios.post("http://localhost:3000/products", {
        ...values,
        stock: 0,
        status: "available",
      }),
    onSuccess: () => {
      message.success("Đã thêm sản phẩm!");
      navigate("/products");
    },
    onError: () => {
      message.error("Lỗi khi thêm sản phẩm!");
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "auto" }}>
      <Title level={3}>Thêm sản phẩm mới</Title>

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
            placeholder="Nhập giá sản phẩm"
            style={{ width: "100%" }}
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
            {categories.map((cat) => (
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
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProdAdd;
