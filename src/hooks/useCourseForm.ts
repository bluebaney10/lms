import { useState, useEffect } from "react";
import useAuthStore from "../store/auth.store";
import { useCourseStore } from "../store/course.store";
import type { Course } from "../type";
import toast from "react-hot-toast";

export type CourseFormValues = Omit<Course, "_id">;

export const useCourseForm = (
  editingId: string | null,
  isOpen: boolean,
  setEditingId: (id: string | null) => void,
  onClose: () => void
) => {
  const { token, user: currentUser } = useAuthStore();
  const { courses, addItem, updateItem } = useCourseStore();

  const initialForm: CourseFormValues = {
    title: "",
    description: "",
    content: "",
    user: currentUser?.id || "",
  };

  const [form, setForm] = useState<CourseFormValues>(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    if (editingId) {
      const item = courses.find((i) => i._id === editingId);
      if (item) {
        setForm({
          title: item.title,
          description: item.description,
          content: item.content,
          user: currentUser?.id || "",
        });
      }
    } else {
      setForm(initialForm);
    }
  }, [editingId, courses, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.content.trim()
    ) {
      return toast.error("All fields are required.");
    }

    try {
      if (editingId) {
        await updateItem(editingId, form, token);
        setEditingId(null);
        toast.success("Course updated");
      } else {
        await addItem({ ...form, user: currentUser?.id || "" }, token);
        toast.success("Course added");
      }

      onClose();
      setForm(initialForm);
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return { form, handleChange, handleSubmit };
};
