import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -----------------------------------------
      DEMO COURSES (always available)
  ------------------------------------------*/
  const demoCourses = [
    {
      _id: "demo1",
      title: "AI Foundations (Free Demo)",
      description:
        "A short AI demo course for presentation. Opens without payment.",
      price: 0,
      thumbnail:
        "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      _id: "demo2",
      title: "Drone Technology 101",
      description:
        "Understand drone components, flight dynamics, and basic maintenance.",
      price: 399,
      thumbnail:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      _id: "demo3",
      title: "AI-Driven Aerial Mapping",
      description:
        "Use drones and AI for mapping, surveying, and environmental monitoring.",
      price: 399,
      thumbnail:
        "https://images.pexels.com/photos/10085647/pexels-photo-10085647.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    // START: Added new courses
    {
      _id: "demo4",
      title: "Deep Learning for Robotics",
      description:
        "Apply TensorFlow and PyTorch to build intelligent autonomous systems.",
      price: 399,
      thumbnail:
        "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      _id: "demo5",
      title: "Drone Programming with Python",
      description:
        "Learn to control drones programmatically using Python SDKs and APIs.",
      price: 399,
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    // END: Added new courses
  ];

  /* -----------------------------------------
      Load Backend Courses + Merge with Demo
  ------------------------------------------*/
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const backendCourses = await apiFetch("/api/courses");

        let mergedCourses = [...demoCourses, ...backendCourses];

        // Remove duplicate IDs
        const unique = mergedCourses.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c._id === course._id)
        );

        setCourses(unique);
      } catch (error) {
        console.warn("⚠ Backend unavailable — showing demo courses only.");
        setCourses(demoCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* -----------------------------------------
      Handle Enroll / View Course
  ------------------------------------------*/
  const handleCourseClick = (course) => {
    // FREE DEMO COURSE (No payment needed)
    if (course._id === "demo1") {
      navigate("/course-demo");
      return;
    }

    // Paid course → Payment
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    localStorage.setItem("selectedCourseId", course._id);
    localStorage.setItem("selectedCoursePrice", course.price);

    navigate("/payment");
  };

  /* -----------------------------------------
      Loading Spinner
  ------------------------------------------*/
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Courses...</p>
        </div>
      </div>
    );
  }

  /* -----------------------------------------
      Courses Grid Display
  ------------------------------------------*/
  return (
    <div className="p-10 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center tracking-wide">
        Explore AI & Drone Courses
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Learn AI, Robotics, and Drone Technologies — designed for future
        innovators. 🚀
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => handleCourseClick(course)}
            tabIndex="0"
            className={`bg-white rounded-2xl cursor-pointer p-6
              transition-all duration-300 ease-in-out transform
              border-2 border-transparent shadow-xl shadow-gray-300/40
              hover:-translate-y-2 hover:border-blue-500
              hover:shadow-[0_0_25px_6px_rgba(59,130,246,0.4)]
              focus:shadow-[0_0_25px_6px_rgba(59,130,246,0.4)]
              focus:outline-none group`}
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="rounded-xl mb-4 w-full h-44 object-cover border border-gray-200 shadow-sm"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image")
              }
            />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-3 line-clamp-3">
              {course.description}
            </p>

            <p className="font-bold text-gray-800 mb-4">
              {course.price === 0 ? "FREE" : `₹${course.price}`}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCourseClick(course);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition"
            >
              {course._id === "demo1" ? "Start Learning" : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}