import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/courses/enrolled", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data);
      } catch (error) {
        setMessage("Failed to load your enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading your courses...</p>;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Your Enrolled Courses
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Progress tracking and quiz results will be displayed here.
      </p>

      {message && <p className="text-red-600 mb-4">{message}</p>}

      {courses.length === 0 ? (
        <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Instructor: {course.instructor.name}
              </p>
              <button
                 onClick={() => navigate(`/course/${course._id}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
