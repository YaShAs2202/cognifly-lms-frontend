// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      {/* 🌟 Header */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 px-8 py-4 flex justify-between items-center border-b border-gray-200">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Cognifly Logo"
            className="w-9 h-9"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Cognifly <span className="text-blue-500">LMS</span>
          </h1>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <button
            onClick={() =>
              document.getElementById("about").scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-600 transition"
          >
            About
          </button>
          <button
            onClick={() =>
              document
                .getElementById("benefits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-600 transition"
          >
            Benefits
          </button>
          <button
            onClick={() =>
              document.getElementById("join").scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-600 transition"
          >
            Join Now
          </button>
        </nav>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          Login
        </button>
      </header>

      {/* 🧠 Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-28 md:pt-36">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Unlock Your Full Potential with{" "}
            <span className="text-blue-600">Cognifly LMS</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            A modern learning platform designed to make studying easier, faster,
            and more interactive. Explore AI-powered lessons, track your
            progress, and earn real certifications that matter.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
            >
              Start Learning
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://www.flyeye.io/wp-content/uploads/2025/01/AI_Powered_Drone_Technology_1028x628.jpg"
            alt="Students learning with drones and AI"
            className="w-4/5 max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition duration-700 ease-in-out"
          />
        </div>
      </section>

      {/* 📘 About Section */}
      <section
        id="about"
        className="mt-24 bg-white py-16 px-10 md:px-24 text-center"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          What Makes Cognifly LMS Different?
        </h3>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Cognifly LMS was built for students who want to learn smarter, not
          harder. Whether you’re studying for college, preparing for a
          certification, or exploring new skills, Cognifly gives you a
          personalized, guided, and engaging learning experience.
        </p>
      </section>

      {/* 🎯 Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-r from-blue-100 to-blue-50 px-10 md:px-24"
      >
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Students Love Cognifly LMS 💙
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png"
              alt="Interactive Learning"
              className="w-16 mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-blue-700 mb-3">
              Interactive Learning
            </h4>
            <p className="text-gray-600">
              Engage with lessons, quizzes, and assignments designed to make
              learning fun and active — not boring.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4228/4228693.png"
              alt="Progress Tracking"
              className="w-16 mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-green-700 mb-3">
              Track Your Progress
            </h4>
            <p className="text-gray-600">
              See how far you’ve come with dashboards, insights, and badges
              that motivate you to reach the next level.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3094/3094855.png"
              alt="Earn Certificates"
              className="w-16 mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-purple-700 mb-3">
              Earn Recognized Certificates
            </h4>
            <p className="text-gray-600">
              Complete courses and earn certificates that validate your skills —
              helping you stand out in academics and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* 🌍 Join Section */}
      <section
        id="join"
        className="py-20 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Join Thousands of Students Already Learning Smarter 🚀
        </h3>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-blue-50">
          Cognifly LMS is your gateway to smarter, self-paced, and engaging
          education. Learn what matters — and achieve your goals faster than
          ever.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Start Learning Now
        </button>
      </section>

      {/* 🌈 Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 text-sm border-t">
        © {new Date().getFullYear()} Cognifly LMS. Empowering students through
        smarter learning.
      </footer>
    </div>
  );
}

export default LandingPage;