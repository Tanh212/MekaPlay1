import { useForm } from "react-hook-form";
import { register as registerApi } from "../services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  email: string;
  password: string;
};

export default function Register() {
  // Khởi tạo form với react-hook-form
  const { register, handleSubmit } = useForm<RegisterForm>();

  // Hook dùng để điều hướng (chuyển trang)
  const navigate = useNavigate();

  // Khi người dùng bấm submit
  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerApi(data);
      toast.success("Đăng ký thành công!");
      navigate("/login"); // Chuyển sang trang đăng nhập
    } catch (err) {
      toast.error("Email đã tồn tại hoặc lỗi server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "auto", marginTop: 60 }}
    >
      <h2>Đăng ký</h2>
      <input
        {...register("email")}
        placeholder="Email"
        type="email"
        required
      />
      <input
        {...register("password")}
        placeholder="Mật khẩu"
        type="password"
        required
      />
      <button type="submit">Đăng ký</button>
    </form>
  );
}
