import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useAdd = (endpoint: string) => {
  return useMutation({
    mutationFn: async (values: any) => {
      return await axios.post(`http://localhost:3000/${endpoint}`, values);
    },
    onSuccess: () => {
      message.success("Thêm thành công");
    },
    onError: () => {
      message.error("Thêm thất bại");
    },
  });
};
