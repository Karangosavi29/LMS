import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/courseDetail/${course.id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="rounded-md mb-3 h-40 w-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {course.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {course.instructor}
      </p>
      <button
        onClick={handleViewCourse}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
      >
        View Course
      </button>
    </div>
  );
}
