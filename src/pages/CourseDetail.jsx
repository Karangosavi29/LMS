import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import js from '../assets/js.png';
import ML from '../assets/ML.png';
import fullstack from '../assets/fullstack.png';
import react from '../assets/react.png';

const mockCourses = [
  {
    id: '1',
    title: 'React for Beginners',
    instructor: 'Jane Doe',
    thumbnail: react,
    description: 'Learn the basics of React, including components, hooks, and state.',
    duration: '5 hours',
    syllabus: [
      'Introduction to React',
      'JSX and Components',
      'State and Props',
      'Hooks Basics',
      'Project Setup',
    ],
    previewVideo: 'https://www.youtube.com/embed/dGcsHMXbSOA', // Added preview video
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    instructor: 'John Smith',
    thumbnail:js,
    description: 'Deep dive into JavaScript ES6+ features and asynchronous programming.',
    duration: '8 hours',
    syllabus: [
      'ES6+ Features',
      'Closures and Scope',
      'Promises and Async/Await',
      'Event Loop',
      'Performance Optimization',
    ],
  },
  {
    id: '3',
    title: "Machine Learning 101",
    instructor: "Alex Brown",
    thumbnail: ML,
    description: "An introductory course to machine learning concepts, algorithms, and practical applications using Python.",
    duration: "10 hours",
    syllabus: [
      "Introduction to Machine Learning",
      "Supervised Learning",
      "Unsupervised Learning",
      "Feature Engineering",
      "Model Evaluation and Validation",
      "Working with Python Libraries (scikit-learn, pandas)",
      "Project: Building a Simple ML Model"
    ],
  },
  {
    id: '4',
    title: "Full Stack Development",
    instructor: "Emma Wilson",
    thumbnail:fullstack,
    description: "Learn to build complete web applications from front-end to back-end with hands-on projects.",
    duration: "12 hours",
    syllabus: [
      "Introduction to Web Development",
      "HTML, CSS, and JavaScript Basics",
      "Front-end Frameworks (React.js)",
      "Back-end Development with Node.js and Express",
      "Databases and REST APIs",
      "Deployment and DevOps Basics",
      "Capstone Project: Build a Full Stack App"
    ],
  }
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const found = mockCourses.find((c) => c.id === id);
    setCourse(found || null);
  }, [id]);

  if (!course) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Course not found</h2>
        <button
          onClick={() => navigate('/courses')}
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
        src={course.thumbnail}
        alt={course.title}
        className="rounded-md w-full max-h-64 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {course.title}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Instructor: <span className="font-medium">{course.instructor}</span>
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{course.description}</p>
      <p className="mb-4">
        <strong>Duration:</strong> {course.duration}
      </p>

      {/* Preview Video */}
      {course.previewVideo && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Course Preview</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={course.previewVideo}
              title="Course Preview"
              className="w-full h-64 rounded-md"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-3">Syllabus</h3>
      <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
        {course.syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md mb-10">
        Enroll Now
      </button>

      {/* Related Courses */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Related Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCourses
            .filter((c) => c.id !== course.id)
            .slice(0, 3)
            .map((related) => (
              <div
                key={related.id}
                className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700"
              >
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-semibold">{related.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Instructor: {related.instructor}
                </p>
                <button
                  onClick={() => navigate(`/courseDetail/${related.id}`)}
                  className="text-blue-600 underline text-sm"
                >
                  View Course
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
