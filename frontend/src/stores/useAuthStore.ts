import { create } from "zustand";

interface User{
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token:
    localStorage.getItem("token") && sessionStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  user:
    localStorage.getItem("user") && sessionStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));

    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    set({ token: null, user: null });
  },
}));

export default useAuthStore;
