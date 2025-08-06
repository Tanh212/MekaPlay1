import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { useList } from "../hooks/useList";
import HeaderBar from "../../components/admin/AHeader";

interface User {
  id: string;
  name: string;
  price: number;
}
function UserList() {
  const { data, isLoading, error } = useList("users");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
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
    <div>
      <HeaderBar />
      {error && <p>Error: {error.message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading} // Hiển thị spinner khi đang tải
        pagination={{ pageSize: 5 }} // Phân trang, mỗi trang 5 bản ghi
      />
    </div>
  );
}

export default UserList;