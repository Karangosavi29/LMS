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
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Profile from './pages/Profile';


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
          <Route path="courseDetail/:id" element={<CourseDetail />} />
          <Route path="CoursePlayer/:id" element={<CoursePlayer />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
