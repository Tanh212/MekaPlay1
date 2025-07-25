import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import Header from "../layouts/Header";

interface Brand {
  id: number;
  name: string;
}

function BrandList() {
  const fetchBrands = async (): Promise<Brand[]> => {
    const res = await fetch("http://localhost:3001/brands");
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Header />
      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default BrandList;
