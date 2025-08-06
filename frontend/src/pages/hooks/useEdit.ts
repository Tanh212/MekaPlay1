import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useEdit = (resource: string, id?: string | number) => {
  const updateItem = async (values: any) => {
    if (!id) throw new Error("Missing ID");
    const res = await axios.put(`http://localhost:3000/${resource}/${id}`, values);
    return res.data;
  };

  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      message.success("Cập nhật thành công");
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};
