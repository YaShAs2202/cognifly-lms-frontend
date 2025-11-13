// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const renderLinks = () => {
    switch (userRole) {
      case "student":
        return (
          <>
            <NavLink to="/dashboard" className="hover:text-blue-600">Dashboard</NavLink>
            <NavLink to="/courses" className="hover:text-blue-600">Courses</NavLink>
            <NavLink to="/progress" className="hover:text-blue-600">Progress</NavLink>
          </>
        );
      case "teacher":
        return (
          <>
            <NavLink to="/dashboard" className="hover:text-blue-600">Dashboard</NavLink>
            <NavLink to="/courses" className="hover:text-blue-600">Courses</NavLink>
            <NavLink to="/progress" className="hover:text-blue-600">Student Progress</NavLink>
          </>
        );
      case "admin":
        return (
          <>
            <NavLink to="/dashboard" className="hover:text-blue-600">Dashboard</NavLink>
            <NavLink to="/courses" className="hover:text-blue-600">Courses</NavLink>
            <NavLink to="/progress" className="hover:text-blue-600">Analytics</NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex items-center justify-between px-6 md:px-10">
      {/* Logo */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-bold text-blue-700 flex items-center gap-1 cursor-pointer"
      >
        Cognifly LMS <span className="text-pink-500">🚀</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">{user?.role === "student" && (
  <Link to="/my-courses" className="hover:text-blue-600">
    My Courses
  </Link>
)}
{renderLinks()}</div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-4">
        {user && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium capitalize">
            {userRole}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex items-center justify-center text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300">
          {renderLinks()}
          {user && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium capitalize">
              {userRole}
            </span>
          )}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
