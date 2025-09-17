import { create } from "zustand";
import axios from "axios";
import type { Course, User } from "../type";
import toast from "react-hot-toast";
import { api } from "../services/api";

type CourseStore = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchItems: (token: string, user: User) => Promise<void>;
  addItem: (item: Course, token: string) => Promise<void>;
  updateItem: (id: string, updated: Course, token: string) => Promise<void>;
  deleteItem: (id: string, token: string) => Promise<void>;
};

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchItems: async (token: string, user: User) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<Course[]>(`/course/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ courses: res.data, loading: false });
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

  addItem: async (item, token) => {
    try {
      const res = await api.post<Course>("/course", item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({ courses: [...state.courses, res.data] }));
      toast.success("Add course successful!");
    } catch (error) {
      set({ error: "Failed to add item" });
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.msg || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },

  updateItem: async (id, updated, token) => {
    try {
      const res = await api.put<Course>(`/course/${id}`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        courses: state.courses.map((i) => (i._id === id ? res.data : i)),
      }));
      toast.success("Update course successful!");
    } catch (error) {
      set({ error: "Failed to update item" });
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.msg || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },

  deleteItem: async (id, token) => {
    try {
      await api.delete<Course[]>(`/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        courses: state.courses.filter((i) => i._id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete item" });
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
