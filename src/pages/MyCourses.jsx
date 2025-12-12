// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment/enrolled/${userId}`
        );

        const data = await res.json();
        setEnrolledCourses(data.courses || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleContinue = (cid) => navigate(`/course/${cid}`);

  if (loading)
    return (
      <div className="text-center text-xl mt-20 text-gray-700">
        Loading your courses...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-10">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
        🎓 My Enrolled Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg mb-4">You have not enrolled in any course yet.</p>
          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {enrolledCourses.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition"
            >
              <img
                src={c.thumbnail}
                className="rounded-xl mb-4 w-full h-44 object-cover"
              />
              <h2 className="text-xl font-semibold mb-3">{c.title}</h2>
              <button
                onClick={() => handleContinue(c._id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Continue Learning
              </button>
              <button
  onClick={() => {
    localStorage.setItem("lastCompletedCourse", JSON.stringify(course));
    navigate("/certificate");
  }}
  className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
>
  Get Certificate
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
