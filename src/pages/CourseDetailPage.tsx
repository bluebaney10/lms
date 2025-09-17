import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/auth.store";
import type { Course } from "../type";

const CourseDetailPage = () => {
  const { token } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:3000/course/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(res.data);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="page">
      <h2 className="head text-center">Course Detail</h2>
      <div className="mb-8">
        <Link to="/courses">
          <button className="bt-secondary">Back</button>
        </Link>
      </div>

      <div className="p-4 rounded shadow">
        <h3 className="text-3xl font-bold mb-4">{course.title}</h3>
        <p className="text-gray-600 mb-6">{course.description}</p>
        <p className="text-gray-800 whitespace-pre-line">{course.content}</p>
      </div>
    </div>
  );
};

export default CourseDetailPage;
