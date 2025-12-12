// src/pages/Certificate.jsx
import React, { useEffect, useState } from "react";

export default function Certificate() {
  const [course, setCourse] = useState(null);

  // Get the last completed course
  useEffect(() => {
    const saved = localStorage.getItem("lastCompletedCourse");
    if (saved) {
      setCourse(JSON.parse(saved));
    }
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        ❌ No completed course found. Complete a course to earn a certificate!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl border-2 border-yellow-400 p-10 rounded-xl text-center w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-yellow-600 mb-4">
          🎉 Certificate of Completion
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          This is to certify that you have successfully completed:
        </p>

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          {course.title}
        </h2>

        <p className="text-gray-500">Presented by Cognifly LMS</p>
      </div>
    </div>
  );
}
