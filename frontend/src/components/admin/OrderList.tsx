import { useQuery } from '@tanstack/react-query';
import { Table, Tag } from 'antd';

interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export function OrderList() {
  const fetchOrders = async (): Promise<Order[]> => {
    const res = await fetch('http://localhost:3000/orders');
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const columns = [
    { title: 'Order ID', dataIndex: 'id' },
    { title: 'User ID', dataIndex: 'userId' },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (total: number) => total.toLocaleString('vi-VN') + ' ₫',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'completed' ? 'green' : status === 'cancelled' ? 'red' : 'orange'
        }>
          {status}
        </Tag>
      ),
    },
    { title: 'Created At', dataIndex: 'createdAt' },
  ];

  return <Table dataSource={data || []} columns={columns} rowKey="id" loading={isLoading} />;
}
export default OrderList;