import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

interface Brand {
  id: number;
  name: string;
  origin: string;
}

function BrandList() {
  const fetchBrands = async (): Promise<Brand[]> => {
    const res = await fetch('http://localhost:3000/brands');
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const columns = [
    { title: 'Brand ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Origin', dataIndex: 'origin' },
  ];

  return <Table dataSource={data || []} columns={columns} rowKey="id" loading={isLoading} />;
}

export default BrandList;