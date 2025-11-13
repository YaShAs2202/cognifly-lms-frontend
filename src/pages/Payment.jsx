import React from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const token = localStorage.getItem("token");
    const course = JSON.parse(localStorage.getItem("selectedCourse"));

    if (!token) {
      alert("User not logged in!");
      return;
    }

    if (!course?._id) {
      alert("Course ID missing!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enrollments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: course._id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Enrollment successful!");
        navigate("/my-courses");
      } else {
        alert(data.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md text-center border-t-4 border-blue-500">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Complete Your Payment 💳
        </h1>
        <p className="text-gray-600 mb-6">
          Scan the QR code below or pay using the UPI ID provided.
        </p>

        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co/SYnzzf3/Whats-App-Image-2025-11-11-at-6-22-39-PM.jpg"
            alt="QR Code"
            className="w-56 h-56 rounded-lg shadow-md border border-gray-200"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-800 font-semibold">UPI ID:</p>
          <p className="text-blue-700 font-bold text-lg">9481012202@pthdfc</p>
          <p className="text-sm text-gray-500 mt-1"> (Use Google Pay, PhonePe, or Paytm to complete the payment) </p>
        </div>

        <button
          onClick={handleConfirmPayment}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          I’ve Completed the Payment
        </button>
      </div>
    </div>
  );
}
