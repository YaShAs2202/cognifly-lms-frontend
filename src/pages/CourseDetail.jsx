// src/pages/CourseDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course details from backend
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle Buy / Enroll Button
  const handleBuyCourse = () => {
    localStorage.setItem("selectedCourseId", id);
    navigate("/payment");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading course...</p>;
  }

  if (!course) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Course not found.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6">
      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        {course.title}
      </h1>

      {/* Thumbnail */}
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-5 shadow"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/800x400?text=Course+Thumbnail")
          }
        />
      )}

      {/* Description */}
      <p className="text-gray-700 mb-6">{course.description}</p>

      {/* Lessons */}
      <h2 className="text-2xl font-semibold mt-6 mb-3">Lessons</h2>
      {course.lessons && course.lessons.length > 0 ? (
        <ul className="ml-5 list-disc text-gray-700">
          {course.lessons.map((lesson, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{lesson.title}</span>
              {lesson.content && (
                <p className="text-sm text-gray-600">{lesson.content}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No lessons added yet.</p>
      )}

      {/* Resources: Videos + PDFs */}
      <h2 className="text-2xl font-semibold mt-6 mb-3">Course Resources</h2>

      {course.resources && course.resources.length > 0 ? (
        <div>
          {course.resources.map((res, index) => (
            <div key={index} className="mb-5">
              {res.type === "video" ? (
                <div>
                  <h3 className="font-semibold mb-2">{res.title}</h3>
                  <video
                    width="100%"
                    controls
                    className="rounded-lg shadow"
                    src={res.url}
                  ></video>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-1">{res.title}</h3>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📄 View PDF
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No resources available.</p>
      )}

      {/* Buy Button */}
      <div className="mt-8">
        <button
          onClick={handleBuyCourse}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Buy / Enroll Now
        </button>
      </div>
    </div>
  );
}
