import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero from '../assets/hero.png';


export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* 🌟 HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Learn Anytime, Anywhere with{" "}
            <span className="text-blue-600">EduMaster</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your personalized e-learning platform to master new skills,
            upskill your career, and achieve your goals — all from home.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              to="/courses"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Right Side (Hero Image) */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={hero}
            alt="Learning Illustration"
            className="w-80 md:w-96"
          />
        </div>
      </section>

      {/* 🚀 FEATURES SECTION */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose <span className="text-blue-600">EduMaster</span>?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Expert Instructors"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from professionals with years of experience in their
                fields.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
                alt="Flexible Learning"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your courses anytime, anywhere — on any device.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3094/3094855.png"
                alt="Certifications"
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Certifications & Rewards
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get recognized with certificates after successful course
                completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ CTA SECTION */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start your learning journey?
        </h2>
        <p className="mb-8">
          Join thousands of students already learning with EduMaster today!
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}
