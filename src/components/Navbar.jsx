import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ your existing hook

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isInstructor = user?.role === "instructor"; // ✅ Check role

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-500"
        >
          EduMaster
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Courses
          </Link>

          <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Dashboard
          </Link>

          {/* ✅ Show only for instructors */}
          {isInstructor && (
            <Link
              to="/add-course"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Add Course
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center py-4 gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">
              Courses
            </Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </Link>

            {/* ✅ Instructor-only link in mobile */}
            {isInstructor && (
              <Link to="/add-course" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">
                Add Course
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-600 border border-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
