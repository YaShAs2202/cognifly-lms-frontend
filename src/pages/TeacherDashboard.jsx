// src/pages/TeacherDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-20">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-green-800 flex justify-center items-center gap-2">
          <span role="img" aria-label="teacher">👩‍🏫</span> Teacher Dashboard
        </h1>
        <p className="text-gray-700 text-lg mt-3">
          Welcome, Instructor!
        </p>
        <p className="text-gray-500 mt-1">
          Manage your courses, monitor student progress, and create engaging content.
        </p>
      </header>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        
        {/* Manage Courses */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            📚 Manage Courses
          </h2>
          <p className="text-gray-600 mb-4">
            Create new courses or update existing ones with ease.
          </p>
          <button
            onClick={() => navigate("/teacher/create-course")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create New Course
          </button>
        </div>

        {/* Student Progress */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            📈 Student Progress
          </h2>
          <p className="text-gray-600 mb-4">
            View analytics and learning progress of your students.
          </p>
          <button
            onClick={() => navigate("/teacher/reports")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Reports
          </button>
        </div>

        {/* Messages */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            💬 Messages
          </h2>
          <p className="text-gray-600 mb-4">
            Communicate with your students and other teachers easily.
          </p>
          <button
            onClick={() => navigate("/teacher/inbox")}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Open Inbox
          </button>
        </div>

      </div>
    </div>
  );
}
