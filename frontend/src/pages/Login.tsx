import { useForm } from "react-hook-form";
import { login } from "../services/authApi";
import { useAuth } from "../stores/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const setToken = useAuth((s) => s.setToken);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data);
      setToken(res.data.accessToken);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "auto", marginTop: 60 }}>
      <h2>Đăng nhập</h2>
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
