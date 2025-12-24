// src/pages/Certificate.jsx
import { useParams, useNavigate } from "react-router-dom";

export default function Certificate() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Read certificate data from localStorage
  const storedData = localStorage.getItem(`course_completed_${courseId}`);
  const certificate = storedData ? JSON.parse(storedData) : null;

  // Safety check
  if (!certificate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl font-semibold text-gray-700">
        ❌ Certificate not available.
        <button
          onClick={() => navigate("/dashboard/student")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      
      {/* ================= CERTIFICATE ONLY ================= */}
      <div
        id="certificate"
        className="bg-white w-full max-w-3xl p-10 border-8 border-blue-700 text-center shadow-2xl rounded-xl"
      >
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Certificate of Completion
        </h1>

        <p className="text-lg mb-6">This certificate is proudly awarded to</p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {certificate.studentName}
        </h2>

        <p className="text-lg mb-4">
          For successfully completing the course
        </p>

        <h3 className="text-2xl font-semibold text-purple-700 mb-8">
          {certificate.courseTitle}
        </h3>

        <p className="text-gray-600 mb-6">
          Issued by <strong>AeroMind LMS</strong>
        </p>

        <p className="text-sm text-gray-500">
          Issued on:{" "}
          {new Date(certificate.completedAt).toLocaleDateString()}
        </p>
      </div>

      {/* ================= ACTION BUTTONS (OUTSIDE CERTIFICATE) ================= */}
      <div className="mt-8 flex gap-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow"
        >
          🖨️ Download / Print
        </button>

        <button
          onClick={() => navigate("/dashboard/student")}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
