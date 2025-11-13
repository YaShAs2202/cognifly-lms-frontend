// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import Payment from "./pages/Payment";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Certificate from "./pages/Certificate";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ IMPORT CreateCoursePage (IMPORTANT)
import CreateCoursePage from "./pages/CreateCoursePage"; 
// Make sure this file exists: src/pages/CreateCoursePage.jsx

function AppContent() {
  const location = useLocation();

  // Hide navbar on these pages
  const hideNavbarRoutes = ["/", "/signup", "/landing", "/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- DASHBOARD (AUTO REDIRECT BASED ON ROLE) ---------- */}
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

        {/* ---------- ROLE SPECIFIC DASHBOARDS ---------- */}
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

        {/* ---------- COURSES & PAYMENT ---------- */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
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

        {/* ---------- STUDENT CERTIFICATES ---------- */}
        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />

        {/* ---------- TEACHER: CREATE COURSE PAGE ---------- */}
        <Route
          path="/teacher/create-course"
          element={
            <ProtectedRoute>
              <CreateCoursePage />
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
