import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-3">EduMaster</h3>
          <p className="text-sm">
            Empowering students and instructors with world-class online learning
            experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-600">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-600">
                Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-300 dark:border-gray-700 pt-6">
        © {new Date().getFullYear()} EduMaster. All rights reserved.
      </div>
    </footer>
  );
}
