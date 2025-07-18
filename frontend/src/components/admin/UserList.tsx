import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
}

export function UserList() {
  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch('http://localhost:3000/users');
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const columns = [
    { title: 'User ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' },
  ];

  return <Table dataSource={data || []} columns={columns} rowKey="id" loading={isLoading} />;
}
export default UserList;