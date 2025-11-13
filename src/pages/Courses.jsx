// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiFetch("/api/courses");

        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        } else {
          throw new Error("No backend courses");
        }
      } catch (error) {
        console.warn("⚠️ Backend unavailable — using demo courses...");
        setCourses([
          {
            _id: "1",
            title: "AI Foundations",
            description:
              "Master the basics of Artificial Intelligence, machine learning, and neural networks.",
            price: 1,
            thumbnail:
              "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "2",
            title: "Drone Technology 101",
            description:
              "Understand drone components, flight dynamics, and basic maintenance.",
            price: 249,
            thumbnail:
              "https://images.pexels.com/photos/3789878/pexels-photo-3789878.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "3",
            title: "AI-Driven Aerial Mapping",
            description:
              "Use drones and AI for mapping, surveying, and environmental monitoring.",
            price: 349,
            thumbnail:
              "https://images.pexels.com/photos/10085647/pexels-photo-10085647.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "4",
            title: "Deep Learning for Robotics",
            description:
              "Apply TensorFlow and PyTorch to build intelligent autonomous systems.",
            price: 399,
            thumbnail:
              "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "5",
            title: "Drone Programming with Python",
            description:
              "Learn to control drones programmatically using Python SDKs and APIs.",
            price: 299,
            thumbnail:
              "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "6",
            title: "Autonomous Drone Navigation",
            description:
              "Build drones that navigate obstacles autonomously using computer vision.",
            price: 499,
            thumbnail:
              "https://www.flyeye.io/wp-content/uploads/2025/01/AI_Powered_Drone_Technology_1028x628.jpg",
          },
          {
            _id: "7",
            title: "AI-Powered Surveillance Drones",
            description:
              "Develop smart surveillance systems using drones and deep learning.",
            price: 549,
            thumbnail:
              "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "8",
            title: "Drone Data Analytics with AI",
            description:
              "Analyze aerial images using AI models to extract useful data and patterns.",
            price: 399,
            thumbnail:
              "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            _id: "9",
            title: "AI Robotics Integration",
            description:
              "Integrate drone systems with AI-powered robotic arms and automation.",
            price: 599,
            thumbnail:
              "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Save selected course for checkout
  const handleEnroll = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/payment");
  };

  // Loading UI
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

  return (
    <div className="p-10 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center tracking-wide">
        Explore AI & Drone Courses
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Learn the most advanced AI, Robotics, and Drone Technologies — designed
        for students who dream of building the future. 🚀
      </p>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => handleEnroll(course)}
            className="relative bg-white rounded-2xl shadow-xl cursor-pointer 
            transition-transform transform hover:-translate-y-2 hover:shadow-2xl group"
          >
            {/* Double Border Glow */}
            <div className="absolute inset-0 rounded-2xl border-4 border-gray-300 
            group-hover:border-blue-400 group-hover:shadow-[0_0_25px_6px_rgba(59,130,246,0.4)] transition-all duration-300"></div>

            <div className="absolute inset-1 rounded-2xl border-2 border-gray-600 
            group-hover:border-blue-500 transition-all duration-300"></div>

            {/* Course Content */}
            <div className="relative z-10 p-6">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-xl mb-4 w-full h-44 object-cover border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=Image+Unavailable";
                }}
              />

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600 mb-3 line-clamp-3">
                {course.description}
              </p>

              <p className="font-bold text-gray-800 mb-4">
                ₹{course.price ?? 0}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnroll(course);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
