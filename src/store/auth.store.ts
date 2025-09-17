import { create } from "zustand";
import type { User } from "../type";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../services/api";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  token: string;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
};

const getUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"),
  user: getUserFromStorage(),
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (value) => {
    set({ isLoading: value });
  },
  logout: () => {
    set({ user: null, token: "", isAuthenticated: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  login: async (credentials) => {
    if (!credentials.email || !credentials.password) {
      toast.error("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await api.post("/login", credentials);

      if (res.data) {
        set({
          user: {
            id: res.data.user.id,
            name: res.data.user.name,
            email: credentials.email,
          },
        });
        set({ isAuthenticated: true });
        set({ token: res.data.token });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful!");
      } else {
        toast.error(
          res.data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.msg || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },
}));

export default useAuthStore;
