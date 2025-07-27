import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import HeaderBar from "../../components/admin/AHeader";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const fetchUsers = async () => {
    const res = await fetch(
      `http://localhost:3000/users?name_like=${name || ""}`
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users", name], // thêm `name` vào queryKey để re-fetch khi search thay đổi
    queryFn: fetchUsers,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`/user/detail/${id}`}>#{id}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <HeaderBar />
      {error && <p style={{ color: "red" }}>Error: {(error as Error).message}</p>}

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

export default UserList;
