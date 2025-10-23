// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import CoursePlayer from "./pages/CoursePlayer";
import Profile from "./pages/Profile";
import AddCourse from "./pages/AddCourse";
import AddLesson from "./pages/AddLesson";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="footer" element={<Footer />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/player" element={<CoursePlayer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/course/:id/add-lesson" element={<AddLesson />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
