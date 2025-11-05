// src/pages/TeacherDashboard.jsx
import React from "react";

function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-10 ">
      {/* Header */}
      <header className="flex justify-center items-center mb-10">
        <h1 className="text-3xl font-extrabold text-green-800 tracking-wide">
          👨‍🏫 Teacher Dashboard
        </h1>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, Instructor!
        </h2>
        <p className="text-gray-600">
          Manage your courses, monitor student progress, and create engaging content.
        </p>
      </section>

      {/* Dashboard Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {/* Manage Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📚 Manage Courses</h2>
          <p className="text-gray-600 mb-4">
            Create new courses or update existing ones with ease.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow">
            Create New Course
          </button>
        </div>

        {/* Student Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Student Progress</h2>
          <p className="text-gray-600 mb-4">
            View analytics and learning progress of your students.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
            View Reports
          </button>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">💬 Messages</h2>
          <p className="text-gray-600 mb-4">
            Communicate with your students and other teachers easily.
          </p>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition shadow">
            Open Inbox
          </button>
        </div>
      </section>
    </div>
  );
}

export default TeacherDashboard;
