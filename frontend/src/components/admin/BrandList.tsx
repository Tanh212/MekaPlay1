import { useQuery } from "@tanstack/react-query";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
interface Brand {
  id: number;
  name: string;
  origin: string;
}

function BrandList() {
  const navigate = useNavigate();
  const fetchBrands = async (): Promise<Brand[]> => {
    const res = await fetch("http://localhost:3000/brands");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const columns = [
    { title: "Brand ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Origin", dataIndex: "origin" },
  ];

  return (
    <div>
      <Table
        dataSource={data || []}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />
      <Button onClick={() => navigate("/")}>Về trang chủ</Button>
    </div>
  );
}

export default BrandList;
