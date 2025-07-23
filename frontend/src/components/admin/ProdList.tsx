import { useQuery } from "@tanstack/react-query";
import { Table, Spin, Image, Tag, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Products {
  id: number;
  name: string;
  price: number;
  brandId: number;
  categoryId: number;
  stock: number;
  status: "available" | "out-of-stock";
  thumbnail: string;
}

function ProdList() {
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    console.log("Fetched products:", data); // 🐛 Debug để xem API trả về gì
    return data;
    
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  console.log(data, isLoading, error);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Products, b: Products) => a.price - b.price,
      render: (price: any) =>
        typeof price === "number"
          ? price.toLocaleString("vi-VN") + " ₫"
          : price?.amount?.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "available" ? "green" : "red"}>
          {status === "available" ? "In stock" : "Out of stock"}
        </Tag>
      ),
    },
    {
      title: "Image",
      dataIndex: "thumnail",
      render: (src: string, record: Products) => (
        <Image src={record.thumbnail} alt={record.name} width={80} />
      ),
    },
  ];
  return (
    <div style={{ padding: 24 }}>
      <h2>Product List</h2>
      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}
      <Table
        dataSource={data || []}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
       <Button onClick={() => navigate("/")}>Về trang chủ</Button>
    </div>
  );
}
export default ProdList;
