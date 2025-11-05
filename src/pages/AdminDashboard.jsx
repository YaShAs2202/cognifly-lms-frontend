// src/pages/AdminDashboard.jsx
import React from "react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-10 ">
      {/* Header */}
      <header className="flex justify-center items-center mb-10">
        <h1 className="text-3xl font-extrabold text-purple-800 tracking-wide">

          🛠️ Admin Dashboard
        </h1>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, Admin!
        </h2>
        <p className="text-gray-600">
          Manage users, approve courses, and oversee system activity.
        </p>
      </section>

      {/* Dashboard Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            👥 User Management
          </h2>
          <p className="text-gray-600 mb-4">
            Add, remove, or update students, teachers, and admins.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow">
            Manage Users
          </button>
        </div>

        {/* Course Approvals */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            ✅ Course Approvals
          </h2>
          <p className="text-gray-600 mb-4">
            Review and approve courses submitted by instructors.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow">
            Approve Courses
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📊 Site Analytics
          </h2>
          <p className="text-gray-600 mb-4">
            View overall performance and engagement statistics.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
            View Analytics
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
