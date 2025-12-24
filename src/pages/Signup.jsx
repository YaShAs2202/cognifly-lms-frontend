// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "", // success | error
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closePopup = () => {
    setPopup({ show: false, type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://cognifly-lms-backend.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPopup({
          show: true,
          type: "success",
          message: "🎉 Account created successfully! Redirecting to login...",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: data.message || "Signup failed. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        type: "error",
        message: "⚠️ Unable to connect to server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= POPUP MODAL ================= */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-sm text-center shadow-2xl border border-gray-700 animate-scaleIn">
            <h3
              className={`text-xl font-bold mb-3 ${
                popup.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {popup.type === "success" ? "Success 🎉" : "Error ❌"}
            </h3>

            <p className="text-gray-300 mb-5">{popup.message}</p>

            <button
              onClick={closePopup}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                popup.type === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ================= PAGE ================= */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-3xl animate-pulse"></div>

        <h1 className="absolute top-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg animate-pulse">
          AeroMind LMS 🚀
        </h1>

        <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-purple-500 transition-all mt-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Create Account ✨
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Join AeroMind LMS and start your learning journey!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="student">🎓 Student</option>
              <option value="teacher">👨‍🏫 Teacher</option>
              <option value="admin">🛠️ Admin</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition font-semibold shadow-lg text-white ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/" className="text-purple-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
