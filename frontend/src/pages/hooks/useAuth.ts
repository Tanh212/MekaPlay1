// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";

const API_URL = "http://localhost:3000";

export const useAuth = (type: "login" | "register") => {
  const login = useAuthStore((state) => state.login);

  const authFn = async (values: any) => {
    const endpoint = type === "login" ? "/login" : "/register";
    const res = await axios.post(`${API_URL}${endpoint}`, values);
    return res.data;
  };

  return useMutation({
    mutationFn: authFn,
    onSuccess: (data) => {
      if (type === "login") {
        login(data.accessToken, data.user); // Lưu vào store + localStorage
      }
      message.success(
        type === "login" ? "Đăng nhập thành công" : "Đăng ký thành công"
      );
    },
    onError: (error: any) => {
      message.error(error?.response?.data || "Có lỗi xảy ra");
    },
  });
};
