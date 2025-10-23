import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // contains user info (role, name, etc.)

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // ✅ Fetch course + enrollment + lessons
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1️⃣ Fetch course
        const { data: courseData } = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );
        setCourse(courseData);

        // 2️⃣ Check enrollment (only if logged in)
        if (token) {
          const { data } = await axios.get(
            `http://localhost:5000/api/courses/enrolled`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const enrolled = data.some((c) => c._id === id);
          setIsEnrolled(enrolled);
          if (enrolled) setMessage("🎓 You are enrolled in this course");
        }

        // 3️⃣ Fetch lessons if enrolled
        if (token && isEnrolled) {
          const { data: lessonsData } = await axios.get(
            `http://localhost:5000/api/courses/${id}/lessons`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setLessons(lessonsData);
        }
      } catch (error) {
        console.error("Error loading course:", error);
        setMessage("Error loading course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, isEnrolled]);

  // ✅ Enroll handler
  const handleEnroll = async () => {
    if (!user) {
      setMessage("⚠️ Please login to enroll.");
      return;
    }

    try {
      setEnrolling(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEnrolled(true);
      setMessage("🎉 Enrolled successfully!");
    } catch (error) {
      console.error("Enroll error:", error);
      setMessage(
        error.response?.data?.message || "Enrollment failed. Try again."
      );
    } finally {
      setEnrolling(false);
    }
  };

  // ✅ Loading UI
  if (loading) return <p className="text-center p-10">Loading course...</p>;

  if (!course) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Course not found</h2>
        <button
          onClick={() => navigate("/courses")}
          className="text-blue-600 underline"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <img
        src={course.thumbnail || "https://via.placeholder.com/600x300"}
        alt={course.title}
        className="rounded-md w-full max-h-64 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {course.title}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Instructor:{" "}
        <span className="font-medium">{course.instructor?.name}</span>
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {course.description}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {course.category}
      </p>
      <p className="mb-2">
        <strong>Level:</strong> {course.level}
      </p>
      <p className="mb-6">
        <strong>Price:</strong> ${course.price}
      </p>

      {/* ✅ Show Enroll / Go to Course */}
      {!isEnrolled ? (
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
        >
          {enrolling ? "Enrolling..." : "Enroll Now"}
        </button>
      ) : (
        <button
          onClick={() => navigate(`/course/${course._id}/player`)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
        >
          Go to Course
        </button>
      )}

      {message && (
        <p className="text-green-600 mt-4 text-center font-medium">{message}</p>
      )}

      {/* ✅ Instructor-only button */}
      {user?.role === "instructor" && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(`/course/${course._id}/add-lesson`)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md"
          >
            + Add Lesson
          </button>
        </div>
      )}

      {/* ✅ Show Lessons */}
      {isEnrolled && lessons.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Lessons</h3>
          <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
            {lessons.map((lesson) => (
              <li key={lesson._id}>
                {lesson.title} — {lesson.duration || "Unknown"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
