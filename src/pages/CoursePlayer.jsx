import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CoursePlayer() {
  const { id } = useParams(); // ✅ This is the correct param
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  console.log("Course Player ID:", id);

  useEffect(() => {
    if (!id) return; // Prevent undefined requests

    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}/lessons`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLessons(res.data);
        if (res.data.length > 0) setSelectedLesson(res.data[0]);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10">Loading lessons...</div>;

  if (lessons.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">
        No lessons found for this course.
      </div>
    );

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-300 dark:border-gray-700 pr-4">
        <h2 className="text-xl font-semibold mb-4">Course Lessons</h2>
        <ul>
          {lessons.map((lesson) => (
            <li
              key={lesson._id}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedLesson?._id === lesson._id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelectedLesson(lesson);
                setQuizAnswer(null);
                setQuizResult(null);
              }}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-6">
        <h3 className="text-2xl font-bold mb-4">{selectedLesson?.title}</h3>

        {/* Video Player */}
        <div className="mb-6 aspect-w-16 aspect-h-9">
          <ReactPlayer
            url={selectedLesson?.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>

        {/* Description */}
        {selectedLesson?.description && (
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            {selectedLesson.description}
          </p>
        )}

        {/* Resources */}
        {selectedLesson?.resources?.length > 0 && (
          <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Resources</h4>
            <ul className="list-disc list-inside">
              {selectedLesson.resources.map((res, i) => (
                <li key={i}>
                  <a
                    href={res}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
