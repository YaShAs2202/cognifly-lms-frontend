// src/pages/DashboardStudent.jsx
import React from "react";

function DashboardStudent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10 ">
      {/* Header */}
      <header className="flex justify-center items-center mb-10">
        <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">
          🎓 Student Dashboard
        </h1>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to Your Learning Space!
        </h2>
        <p className="text-gray-600">
          Track your progress, check upcoming lessons, and earn certificates 🚀
        </p>
      </section>

      {/* Dashboard Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📘 My Courses</h2>

          <p className="text-gray-600 mb-2">AI Foundations — 70% complete</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full w-[70%]"></div>
          </div>

          <p className="text-gray-600 mb-2">Drone Technology — 40% complete</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-400 h-2.5 rounded-full w-[40%]"></div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🗓️ Upcoming Lessons</h2>
          <ul className="space-y-2 text-gray-600">
            <li>📅 Drone Flight Dynamics — Tomorrow</li>
            <li>📅 AI Ethics — Friday</li>
          </ul>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🏅 Certificates</h2>
          <p className="text-gray-600 mb-4">
            Earn certificates as you complete your courses.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow">
            View Certificates
          </button>
          
        </div>
      </section>
    </div>
  );
}

export default DashboardStudent;
