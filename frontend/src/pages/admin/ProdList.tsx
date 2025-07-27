import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Space, Spin, Table, message } from "antd";
import HeaderBar from "../../components/admin/AHeader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProdList() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch product list
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`http://localhost:3000/products?name_like=${name}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", name],
    queryFn: fetchProducts,
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
    },
    onSuccess: () => {
      message.success("Đã xóa sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // ✅ Đúng cú pháp
    },
    onError: () => {
      message.error("Xóa sản phẩm thất bại");
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => <Link to={`/product/detail/${id}`}>#{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => price.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Image",
      dataIndex: "thumbnail", // ✅ sửa lại
      render: (src: string, record: Product) => (
        <Image
          src={src}
          width={100}
          alt={record.name}
          fallback="https://via.placeholder.com/100"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (desc: string) =>
        desc?.length > 60 ? desc.slice(0, 60) + "..." : desc,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/products/edit/${record.id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <HeaderBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Danh sách sản phẩm</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/products/add")}
        >
          Thêm sản phẩm
        </Button>
      </div>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default ProdList;
