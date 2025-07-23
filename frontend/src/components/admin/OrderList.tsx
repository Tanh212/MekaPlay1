import { useQuery } from "@tanstack/react-query";
import { Table, Tag,Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  userId: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
function OrderList() {
  const navigate= useNavigate();
  const fetchOrders = async (): Promise<Order[]> => {
    const res = await fetch("http://localhost:3000/orders");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: 2000,
  });

  const columns = [
    { title: "Order ID", dataIndex: "id" },
    { title: "User ID", dataIndex: "userId" },
    {
      title: "Total",
      dataIndex: "total",
      render: (total: number) => total.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "cancelled"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    { title: "Created At", dataIndex: "createdAt" },
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
export default OrderList;
