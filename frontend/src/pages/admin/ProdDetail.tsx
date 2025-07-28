import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Image, Spin, Typography } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  category?: string;
  brand?: string;
}

const ProdDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data as Product;
    },
  });

  if (isLoading) return <Spin fullscreen />;
  if (error || !data) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: 800, width: "100%" }}>
        <Image
          src={data.thumbnail}
          width={200}
          alt={data.name}
          fallback="https://via.placeholder.com/200"
        />

        <Title level={2} style={{ marginTop: 16 }}>
          {data.name}
        </Title>
        <Title level={4} style={{ color: "red" }}>
          {data.price.toLocaleString()}₫
        </Title>
        <Paragraph>{data.description}</Paragraph>
        {data.category && (
          <Paragraph>
            <b>Danh mục:</b> {data.category}
          </Paragraph>
        )}
        {data.brand && (
          <Paragraph>
            <b>Thương hiệu:</b> {data.brand}
          </Paragraph>
        )}
      </Card>
    </div>
  );
};

export default ProdDetail;
