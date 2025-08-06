import { Table, Image, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { useList } from "../hooks/useList";
import { useDelete } from "../hooks/useDelete";
import HeaderBar from "../../components/admin/AHeader";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProdList() {
  const { data, isLoading, error, refetch } = useList<Product>("products");
  const deleteMutation = useDelete("products");

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        message.success("Xoá sản phẩm thành công");
        refetch(); // cập nhật lại danh sách
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string) => (
        <Link to={`/products/detail/${id}`}>{id}</Link>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      render: (src: string) => (
        <Image
          src={src}
          width={100}
          fallback="https://via.placeholder.com/120x80?text=No+Image"
        />
      ),
    },
    {
      title: "Thao tác",
      render: (_: any, record: Product) => (
        <div className="flex gap-2">
          <Link to={`/admin/products/edit/${record.id}`}>
            <Button type="default">Sửa</Button>
          </Link>

          <Popconfirm
            title="Xác nhận xoá?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger loading={deleteMutation.isPending}>
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <HeaderBar />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
        <Link to="/admin/products/add">
          <Button type="primary">Thêm sản phẩm</Button>
        </Link>
      </div>
      {error && <p className="text-red-500">Lỗi: {error.message}</p>}
      
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
