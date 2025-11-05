// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const location = useLocation();

  // ✅ 1. Check login status
  if (!user || !token) {
    alert("Please log in first!");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // ✅ 2. Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert("Access Denied: You are not authorized to view this page.");
    // Redirect to the correct dashboard
    if (user.role === "student") return <Navigate to="/dashboard/student" replace />;
    if (user.role === "teacher") return <Navigate to="/dashboard/teacher" replace />;
    if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;
  }

  // ✅ 3. If authorized, show content
  return children;
}
