// src/pages/ProgressPage.jsx
import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";

export default function ProgressPage() {
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  // DEMO COURSE
  const demoCourse = {
    _id: "demo123",
    title: "AI Foundations Demo Course",
    lessons: [
      { title: "Introduction to AI", video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
      { title: "Machine Learning Basics", video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4" },
      { title: "Deep Learning Overview", video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4" },
    ],
  };

  useEffect(() => {
    setCourse(demoCourse);
  }, []);

  const handleVideoEnded = () => {
    const key = `progress_${course._id}`;
    const saved = Number(localStorage.getItem(key) || 0);

    if (saved < currentLesson + 1) {
      localStorage.setItem(key, currentLesson + 1);
    }

    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  if (!course) {
    return <h2 className="text-center mt-10 text-gray-600">Loading progress…</h2>;
  }

  const lesson = course.lessons[currentLesson];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">{course.title}</h1>

      <ProgressBar course={course} />

      <div className="bg-white p-5 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-3">{lesson.title}</h2>

        <video
          src={lesson.video}
          controls
          className="w-full rounded-lg"
          onEnded={handleVideoEnded}
        ></video>

        <p className="text-gray-600 mt-3">
          Lesson {currentLesson + 1} of {course.lessons.length}
        </p>
      </div>
    </div>
  );
}
