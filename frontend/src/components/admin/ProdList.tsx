import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import Header from "../layouts/Header";
import { Link, useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function ProdList() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/products?name_like=${name || ""}`
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", name],
    queryFn: fetchProducts,
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
      dataIndex: "image",
      render: (src: string, record: Product) => (
        <Image src={src} width={120} alt={record.name} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (desc: string) => (
        <span>{desc?.length > 60 ? desc.slice(0, 60) + "..." : desc}</span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Header />
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
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
