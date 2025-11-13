// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Fetch enrolled courses from backend
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment/enrolled/${userId}`
        );

        const data = await res.json();
        setEnrolledCourses(data.courses || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleContinue = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl text-gray-700 font-semibold">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-10">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
        🎓 My Enrolled Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg mb-4">You haven’t enrolled in any courses yet.</p>

          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="relative bg-white rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative z-10 p-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-xl mb-4 w-full h-44 object-cover border border-gray-200 shadow-sm"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400.png?text=Course+Image";
                  }}
                />

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>

                <button
                  onClick={() => handleContinue(course._id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
