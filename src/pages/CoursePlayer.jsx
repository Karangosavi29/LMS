import React, { useState } from "react";
import ReactPlayer from "react-player";

const mockCourse = {
  title: "React for Beginners",
  lessons: [
    {
      id: "1",
      title: "Introduction to React",
      videoUrl: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
      resources: [
        { type: "PDF", name: "Intro Slides", url: "/resources/intro.pdf" },
        { type: "Code", name: "Example Code", url: "/resources/intro-code.zip" },
      ],
      quiz: {
        question: "What is JSX?",
        options: ["JavaScript XML", "JavaScript eXtended", "Java Syntax Extension"],
        answer: 0,
      },
      notes: "JSX allows you to write HTML inside JavaScript.",
    },
    {
      id: "2",
      title: "JSX and Components",
      videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      resources: [
        { type: "PDF", name: "JSX Guide", url: "/resources/jsx.pdf" },
      ],
      quiz: null,
      notes: "Components can be functional or class-based.",
    },
  ],
};

export default function CoursePlayer() {
  const [selectedLesson, setSelectedLesson] = useState(mockCourse.lessons[0]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  function handleQuizSubmit() {
    if (quizAnswer === selectedLesson.quiz.answer) {
      setQuizResult("Correct! 🎉");
    } else {
      setQuizResult("Wrong answer. Try again.");
    }
  }

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-300 dark:border-gray-700 pr-4">
        <h2 className="text-xl font-semibold mb-4">{mockCourse.title}</h2>
        <ul>
          {mockCourse.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`cursor-pointer mb-2 p-2 rounded ${
                lesson.id === selectedLesson.id
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
        <h3 className="text-2xl font-bold mb-4">{selectedLesson.title}</h3>

        {/* Video Player */}
        <div className="mb-6 aspect-w-16 aspect-h-9">
          <ReactPlayer
            url={selectedLesson.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </div>

        {/* Resources */}
        <section className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Resources</h4>
          {selectedLesson.resources && selectedLesson.resources.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedLesson.resources.map((res, i) => (
                <li key={i}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {res.type}: {res.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resources available for this lesson.</p>
          )}
        </section>

        {/* Notes */}
        {selectedLesson.notes && (
          <section className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Notes</h4>
            <p className="bg-gray-100 dark:bg-gray-700 p-4 rounded">{selectedLesson.notes}</p>
          </section>
        )}

        {/* Quiz */}
        {selectedLesson.quiz && (
          <section>
            <h4 className="text-xl font-semibold mb-2">Quiz</h4>
            <p className="mb-2">{selectedLesson.quiz.question}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuizSubmit();
              }}
            >
              {selectedLesson.quiz.options.map((option, idx) => (
                <label key={idx} className="block mb-1 cursor-pointer">
                  <input
                    type="radio"
                    name="quiz"
                    value={idx}
                    checked={quizAnswer === idx}
                    onChange={() => setQuizAnswer(idx)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}

              <button
                type="submit"
                disabled={quizAnswer === null}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Submit Answer
              </button>
            </form>

            {quizResult && (
              <p className={`mt-3 font-semibold ${quizResult.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                {quizResult}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
