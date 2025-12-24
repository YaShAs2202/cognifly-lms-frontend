// src/pages/StudentDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // ✅ Read completed courses
  const completedCourses = Object.keys(localStorage)
    .filter((key) => key.startsWith("course_completed_"))
    .map((key) => JSON.parse(localStorage.getItem(key)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <header className="flex justify-center mb-10">
        <h1 className="text-3xl font-extrabold text-blue-800">
          🎓 Student Dashboard
        </h1>
      </header>

      <section className="grid md:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">📘 My Courses</h2>
          <p className="text-gray-600">
            AI Free Demo Course —{" "}
            {completedCourses.length > 0 ? "100% Complete" : "In Progress"}
          </p>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">🗓️ Upcoming Lessons</h2>
          <ul className="text-gray-600">
            <li>AI Agents</li>
            <li>Prompt Engineering</li>
          </ul>
        </div>

        {/* Certificates */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">🏅 Certificates</h2>

          {completedCourses.length === 0 ? (
            <p className="text-gray-600">
              No certificates yet. Complete a course 🎯
            </p>
          ) : (
            completedCourses.map((course) => (
              <button
                key={course.courseId}
                onClick={() => navigate(`/certificate/${course.courseId}`)}
                className="w-full mb-3 bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                🎓 View Certificate — {course.courseTitle}
              </button>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
