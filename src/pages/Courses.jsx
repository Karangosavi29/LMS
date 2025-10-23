import CourseCard from "../components/CourseCard";
import js from '../assets/js.png';
import ML from '../assets/ML.png';
import fullstack from '../assets/fullstack.png';
import react from '../assets/react.png';

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      instructor: "John Doe",
      thumbnail: react,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      thumbnail: js,

    },
    {
      id: 3,
      title: "Machine Learning 101",
      instructor: "Alex Brown",
      thumbnail: ML,
    },
    {
      id: 4,
      title: "Full Stack Development",
      instructor: "Emma Wilson",
      thumbnail: fullstack,
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-950 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Explore Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
