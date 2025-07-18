import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function CategoryList() {
  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");
    return response.json();
  };
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}
export default CategoryList;
