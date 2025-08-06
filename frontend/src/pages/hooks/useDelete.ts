import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

export const useDelete = (endpoint: string) => {
  return useMutation({
    mutationFn: async (id: string | number) => {
      return await axios.delete(`http://localhost:3000/${endpoint}/${id}`);
    },
    onSuccess: () => {
      message.success("Xoá thành công");
    },
    onError: () => {
      message.error("Xoá thất bại");
    },
  });
};
