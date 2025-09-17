import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import { useCourseStore } from "../store/course.store";
import CourseFormPopup from "../popups/CourseFormPopup";
import ConfirmPopup from "../popups/ConfirmPopup";

const CoursesPage = () => {
  const { token, user } = useAuthStore();
  const { courses, fetchItems, deleteItem } = useCourseStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (token && user) fetchItems(token, user);
  }, [token, user]);

  const openAddForm = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (id: string) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  return (
    <div className="page">
      <CourseFormPopup
        editingId={editingId}
        setEditingId={setEditingId}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      <ConfirmPopup
        isOpen={!!deleteId}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {
          if (deleteId) deleteItem(deleteId, token);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
      <h2 className="head text-center">Courses</h2>
      <div>
        <button className="btn bt-primary mb-8" onClick={openAddForm}>
          + Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-xl mb-2">{course.description}</p>
              <p className="text-gray-600">{course.content}</p>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <Link to={`/course/detail/${course._id}`}>
                <button className="bt-secondary">View</button>
              </Link>
              <button
                className="bt-secondary"
                onClick={() => openEditForm(course._id || "")}
              >
                Edit
              </button>
              <button
                className="bt-danger"
                onClick={() => setDeleteId(course._id || "")}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
