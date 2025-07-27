import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import HeaderBar from "../../components/admin/AHeader";


interface Order {
  id: number;
  userId: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
}

function OrderList() {
  const fetchOrders = async (): Promise<Order[]> => {
    const res = await fetch("http://localhost:3000/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total: number) => total.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: Order["status"]) => {
        const color =
          status === "completed"
            ? "green"
            : status === "cancelled"
            ? "red"
            : "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <HeaderBar />
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

export default OrderList;
