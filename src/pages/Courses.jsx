import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Explore Courses</h1>
        {courses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
