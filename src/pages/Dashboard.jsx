import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingEnrolled, setLoadingEnrolled] = useState(false);
  const [enrolledError, setEnrolledError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch enrolled only when user exists and activeTab is “overview”
    const fetchEnrolled = async () => {
      setLoadingEnrolled(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/courses/enrolled",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Enrolled API response:", res.data);
        setEnrolledCourses(res.data);
      } catch (err) {
        console.error("Error fetching enrolled:", err);
        setEnrolledError("Could not load your courses");
      } finally {
        setLoadingEnrolled(false);
      }
    };

    fetchEnrolled();
  }, [user, navigate]);

  const studentTabs = {
    overview: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Enrolled Courses</h2>
        {loadingEnrolled ? (
          <p>Loading your courses...</p>
        ) : enrolledError ? (
          <p className="text-red-500">{enrolledError}</p>
        ) : enrolledCourses.length === 0 ? (
          <p>You haven’t enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
            <CourseCard key={course._id} course={course} />

            ))}
          </div>
        )}

        <h2 className="mt-8 text-2xl font-semibold mb-4">Progress tracking and quiz results will be displayed here.</h2>
      </div>
    ),

    progress: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
        <p>Coming Soon …</p>
      </div>
    ),

    quizzes: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
        <p>Coming Soon …</p>
      </div>
    ),
  };

  const instructorTabs = {
    // your instructor tabs if any
  };

  const tabs = user?.role === "student" ? studentTabs : instructorTabs;
  const tabKeys = Object.keys(tabs);

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">
        Welcome, {user?.name}!
      </h1>

      <nav className="mb-6 border-b border-gray-300">
        <ul className="flex space-x-6">
          {tabKeys.map((tabKey) => (
            <li
              key={tabKey}
              className={`cursor-pointer pb-2 ${
                activeTab === tabKey
                  ? "border-b-4 border-blue-600 font-semibold text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabKey.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            </li>
          ))}
        </ul>
      </nav>

      <section>{tabs[activeTab]}</section>
    </div>
  );
}
