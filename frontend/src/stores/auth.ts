// src/store/auth.ts
import { create } from "zustand";

interface User {
  email: string;
  id: number;
  role?: string; // Có thể dùng để phân quyền: admin, staff, etc.
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
