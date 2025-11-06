// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import Payment from "./pages/Payment";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Certificate from "./pages/Certificate";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbarRoutes = ["/", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Retrieve user role
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Unified Dashboard route (auto-redirects by role) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {userRole === "student" ? (
                <StudentDashboard />
              ) : userRole === "teacher" ? (
                <TeacherDashboard />
              ) : userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Login />
              )}
            </ProtectedRoute>
          }
        />

        {/* Role-specific dashboards (optional direct access) */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Pages */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Certificate /> {/* Replace with actual Progress page later */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
