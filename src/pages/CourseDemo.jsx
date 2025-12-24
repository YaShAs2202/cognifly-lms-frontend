// src/pages/CourseDemo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple ProgressBar (self-contained)
const ProgressBar = ({ progress }) => (
  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
    <div
      className="bg-blue-500 h-2 transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default function CourseDemo() {
  const navigate = useNavigate();

  const COURSE_ID = "demo_ai";
  const COURSE_TITLE = "AI Free Demo Course";

  const lessons = [
    {
      title: "1. AI, ML, DL, and GenAI Explained",
      content: "https://www.youtube.com/embed/qYNweeDHiyU",
    },
    {
      title: "2. AI Basics for Beginners (Full Course)",
      content: "https://www.youtube.com/embed/VGFpV3Qj4as",
    },
    {
      title: "3. How AI works in everyday life (Google AI)",
      content: "https://www.youtube.com/embed/oJC8VIDSx_Q",
    },
  ];

  const [currentLesson, setCurrentLesson] = useState(0);
  const [studentName, setStudentName] = useState("");

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleCertificate = () => {
    if (!studentName.trim()) {
      alert("Please enter your name to generate the certificate.");
      return;
    }

    // ✅ STANDARDIZED COMPLETION STORAGE
    localStorage.setItem(
      `course_completed_${COURSE_ID}`,
      JSON.stringify({
        courseId: COURSE_ID,
        courseTitle: COURSE_TITLE,
        studentName,
        completedAt: new Date().toISOString(),
      })
    );

    navigate(`/certificate/${COURSE_ID}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🚀 {COURSE_TITLE}
      </h1>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar progress={progress} />
        <p className="text-center mt-2 font-semibold text-gray-600">
          Lesson {currentLesson + 1} of {lessons.length} | Progress: {progress}%
        </p>
      </div>

      {/* Lesson */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {lessons[currentLesson].title}
      </h2>

      <iframe
        width="100%"
        height="400"
        src={lessons[currentLesson].content}
        title={lessons[currentLesson].title}
        frameBorder="0"
        allowFullScreen
        className="rounded-lg shadow-xl mb-6"
      ></iframe>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-10">
        {currentLesson > 0 ? (
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            ← Previous
          </button>
        ) : (
          <div />
        )}

        {currentLesson < lessons.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Next Lesson →
          </button>
        ) : (
          <div className="w-1/2 ml-auto">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Enter your name for the certificate
            </h3>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg text-center"
              placeholder="Your Full Name"
            />
            <button
              onClick={handleCertificate}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
            >
              ✔ Complete Course & Get Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
