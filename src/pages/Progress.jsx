// src/pages/Progress.jsx
import React from "react";

export default function Progress() {
  const keys = Object.keys(localStorage).filter((k) =>
    k.startsWith("progress_")
  );

  let allProgress = keys.map((k) => ({
    id: k.replace("progress_", ""),
    progress: JSON.parse(localStorage.getItem(k)).length
  }));

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Your Course Progress</h1>

      {allProgress.length === 0 ? (
        <p className="text-gray-600">No progress tracked yet.</p>
      ) : (
        <ul className="space-y-4">
          {allProgress.map((p) => (
            <li
              key={p.id}
              className="p-4 border rounded-xl shadow bg-white"
            >
              <p className="text-lg">
                Course ID: <strong>{p.id}</strong>
              </p>
              <p className="text-blue-600 font-bold">
                Completed Lessons: {p.progress}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
