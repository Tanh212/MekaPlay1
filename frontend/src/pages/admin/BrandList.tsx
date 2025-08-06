import { Table, Button, Popconfirm, message, Spin } from "antd";
import { Link } from "react-router-dom";
import {useList} from "../hooks/useList";
import axios from "axios";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

 function BrandList() {
  const { data, isLoading, error, refetch } = useList("brands");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:3000/brands/${id}`);
      message.success("Đã xoá danh mục");
      refetch();
    } catch (err) {
      message.error("Xoá thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      render: (_: any, record: Category) => (
        <>
          <Link to={`/admin/brands/edit/${record.id}`}>
            <Button type="link">Sửa</Button>
          </Link>
          <Popconfirm
            title="Xác nhận xoá?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger loading={deletingId === record.id}>
              Xoá
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Spin size="large" />
      </div>
    );

  if (error)
    return <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách thương hiệu</h2>
        <Link to="/admin/brands/add">
          <Button type="primary">Thêm thương hiệu</Button>
        </Link>
      </div>
      <Table rowKey="id" columns={columns} dataSource={data} />
    </div>
  );
}
export default BrandList;