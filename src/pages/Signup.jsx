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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://cognifly-lms-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! 🎉 Please log in now.");
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to server.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-3xl animate-pulse"></div>

      {/* LMS Header */}
      <h1 className="absolute top-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg animate-pulse">
        Cognifly LMS 🚀
      </h1>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-purple-500 transition-all mt-10">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Join Cognifly LMS and start your learning journey!
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

          {/* Role Selector */}
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
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 rounded-lg transition font-semibold shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">{message}</p>
        )}

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
