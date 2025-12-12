// src/components/ProgressBar.jsx
import React, { useEffect, useState } from "react";

export default function ProgressBar({ course }) {
  const [watched, setWatched] = useState(0);

  useEffect(() => {
    if (!course || !course._id || !course.lessons) return;

    const key = `progress_${course._id}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      setWatched(Number(saved));
    }
  }, [course]);

  const total = course?.lessons?.length || 0;
  const percentage = total === 0 ? 0 : Math.round((watched / total) * 100);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border">
      <p className="font-semibold text-gray-800 mb-2">Progress: {percentage}%</p>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {watched} of {total} lessons completed
      </p>
    </div>
  );
}
