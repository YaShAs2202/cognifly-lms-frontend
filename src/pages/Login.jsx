// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://cognifly-lms-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Save auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user._id);

        setMessage(`Welcome back, ${data.user.name}!`);
        setMessageType("success");

        // Small delay for UX, then redirect
        setTimeout(() => {
          if (data.user.role === "student") navigate("/dashboard/student");
          else if (data.user.role === "teacher") navigate("/dashboard/teacher");
          else if (data.user.role === "admin") navigate("/dashboard/admin");
        }, 1000);
      } else {
        setMessage(data.message || "Invalid email or password");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Unable to connect to server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-3xl animate-pulse"></div>

      <h1 className="absolute top-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg animate-pulse">
        AeroMind LMS 🚀
      </h1>

      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-blue-500 transition-all mt-10">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Login to your AeroMind LMS account
        </p>

        {/* Success / Error Message */}
        {message && (
          <p
            className={`mb-8 text-center text-sm font-medium ${
              messageType === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition font-semibold shadow-lg text-white
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
