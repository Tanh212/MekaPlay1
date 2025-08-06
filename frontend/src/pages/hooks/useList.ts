import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Hook tái sử dụng để lấy danh sách từ bất kỳ endpoint nào
export const useList = <T = any>(resource: string, params = {}) => {
  return useQuery({
    queryKey: [resource, params],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/${resource}`, {
        params,
      });
      if (!Array.isArray(res.data)) {
        throw new Error(`Dữ liệu từ /${resource} không hợp lệ`);
      }
      return res.data as T[];
    },
  });
};
