import { Link } from "react-router-dom";

export default function CourseCard({ course, isEnrolled }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition">
      <img
        src={course.thumbnail || "https://via.placeholder.com/600x300"}
        alt={course.title}
        className="rounded-md mb-3 h-40 w-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {course.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {course.instructor?.name || "Unknown Instructor"}      </p>

      <Link
        to={
          isEnrolled
            ? `/course/${course._id}/player` // if enrolled, go directly to player
            : `/course/${course._id}` // otherwise, go to course detail page
        }
      >
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
          {isEnrolled ? "Continue Learning" : "View Course"}
        </button>
      </Link>
    </div>
  );
}
