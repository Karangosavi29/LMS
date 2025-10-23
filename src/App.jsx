import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CoursePlayer from "./pages/CoursePlayer";
import Profile from "./pages/Profile";
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courseplayer/:id" element={<CoursePlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Footer" element={<Footer />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
