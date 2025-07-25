import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import Header from "../layouts/Header";

interface Category {
  id: number;
  name: string;
}

function CategoryList() {
  const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch("http://localhost:3001/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
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

export default CategoryList;
