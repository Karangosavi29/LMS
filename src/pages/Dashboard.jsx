import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // tab state

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) {
    return <p className="p-10 text-center text-gray-500">Redirecting...</p>;
  }

  // Tabs content for Student
  const studentTabs = {
    overview: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Enrolled Courses</h2>
        {/* TODO: Show enrolled courses here */}
        <p>Progress tracking and quiz results will be displayed here.</p>
      </div>
    ),
    progress: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
        {/* TODO: Add progress tracking components */}
        <p>Track your learning progress here.</p>
      </div>
    ),
    quizzes: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
        {/* TODO: Show quiz results */}
        <p>Your quiz scores and analytics will be shown here.</p>
      </div>
    ),
  };

  // Tabs content for Instructor
  const instructorTabs = {
    manageCourses: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Courses</h2>
        {/* TODO: Add/Edit/Delete courses UI */}
        <p>Add or modify your courses here.</p>
      </div>
    ),
    studentStats: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Student Stats</h2>
        {/* TODO: Show student stats */}
        <p>View your students’ progress and stats here.</p>
      </div>
    ),
    uploads: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Upload Resources</h2>
        {/* TODO: Upload lessons/videos/resources */}
        <p>Upload course materials and videos here.</p>
      </div>
    ),
  };

  // Tabs and content selection based on role
  const tabs = user.role === "student" ? studentTabs : instructorTabs;
  const tabKeys = Object.keys(tabs);

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">
        Welcome, {user.name}!
      </h1>

      {/* Tabs navigation */}
      <nav className="mb-6 border-b border-gray-300 dark:border-gray-700">
        <ul className="flex space-x-6">
          {tabKeys.map((tabKey) => (
            <li
              key={tabKey}
              className={`cursor-pointer pb-2 ${
                activeTab === tabKey
                  ? "border-b-4 border-blue-600 font-semibold text-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabKey
                .replace(/([A-Z])/g, " $1") // add spaces before capital letters
                .replace(/^./, (str) => str.toUpperCase())}
            </li>
          ))}
        </ul>
      </nav>

      {/* Tab content */}
      <section>{tabs[activeTab]}</section>
    </div>
  );
}
