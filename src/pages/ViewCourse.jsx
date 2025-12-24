// src/pages/ViewCourse.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";

export default function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const normalizedCourseId = String(courseId); // ✅ IMPORTANT

  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // ================================
  // STATIC LESSON DATA (DEMO)
  // ================================
  const lessonsData = {
    "1": {
      title: "Drone Technical Course",
      lessons: [
        {
          title: "Introduction to Drone Technology",
          videoUrl: "https://www.youtube.com/embed/N_XneaFmOmU",
        },
      ],
    },
    "2": {
      title: "Drone Technology 101",
      lessons: [
        {
          title: "Drone Basics Explained",
          videoUrl: "https://www.youtube.com/embed/1n8zRqGZ5TI",
        },
        {
          title: "How Quadcopters Work",
          videoUrl: "https://www.youtube.com/embed/rk8Ks8K4z9U",
        },
      ],
    },
    "3": {
      title: "AI-Driven Aerial Mapping",
      lessons: [
        {
          title: "Aerial Mapping Introduction",
          videoUrl: "https://www.youtube.com/embed/fIVgq1AWR1c",
        },
      ],
    },
  };

  // ================================
  // Load Course
  // ================================
  useEffect(() => {
    const selectedCourse = lessonsData[normalizedCourseId];

    if (selectedCourse) {
      setCourse(selectedCourse);
      setCurrentLessonIndex(0);
    } else {
      setCourse(null);
    }
  }, [normalizedCourseId]);

  if (!course) {
    return (
      <h1 className="text-center mt-20 text-xl font-semibold">
        Course not found
      </h1>
    );
  }

  // ================================
  // GUARANTEED COMPLETION SAVE
  // ================================
  useEffect(() => {
    const key = `course_completed_${normalizedCourseId}`;

    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, "true");
      console.log("✅ Course marked completed:", key);
    }
  }, [course, normalizedCourseId]);

  // ================================
  // Progress Calculation (UI only)
  // ================================
  const totalLessons = course.lessons.length;
  const currentLesson = course.lessons[currentLessonIndex];

  const progressPercentage = Math.round(
    ((currentLessonIndex + 1) / totalLessons) * 100
  );

  // ================================
  // Navigation
  // ================================
  const goToNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6 border-r">
        <h2 className="text-xl font-bold mb-4">
          {course.title} — Lessons
        </h2>

        {course.lessons.map((lesson, index) => (
          <div
            key={index}
            onClick={() => setCurrentLessonIndex(index)}
            className={`p-3 mb-2 rounded-lg cursor-pointer transition ${
              index === currentLessonIndex
                ? "bg-blue-200 font-semibold"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {lesson.title}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Progress Bar */}
        <ProgressBar percentage={progressPercentage} />

        {/* Generate Certificate */}
        <button
          onClick={() => navigate(`/certificate/${normalizedCourseId}`)}
          className="mb-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          🎓 Generate Certificate
        </button>

        {/* Lesson Title */}
        <h1 className="text-3xl font-bold mb-6">
          {currentLesson.title}
        </h1>

        {/* Video */}
        <iframe
          width="100%"
          height="500"
          src={currentLesson.videoUrl}
          title="Course Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl shadow-xl"
        ></iframe>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goToPreviousLesson}
            disabled={currentLessonIndex === 0}
            className={`px-6 py-3 rounded-lg text-white font-bold transition ${
              currentLessonIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            ⬅ Previous Lesson
          </button>

          <button
            onClick={goToNextLesson}
            disabled={currentLessonIndex === totalLessons - 1}
            className={`px-6 py-3 rounded-lg text-white font-bold transition ${
              currentLessonIndex === totalLessons - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next Lesson ➡
          </button>
        </div>
      </div>
    </div>
  );
}
