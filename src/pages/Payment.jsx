import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [qrUrl, setQrUrl] = useState("");

  // Values saved from CourseDetail.jsx and Login.jsx
  const userId = localStorage.getItem("userId");
  const courseId = localStorage.getItem("selectedCourseId");
  const amount = localStorage.getItem("selectedCoursePrice") || 0;

  // Generate QR code with amount
  useEffect(() => {
    const upiID = "9481012202@pthdfc"; // your UPI ID
    const name = "Yashas"; // Your display name for UPI
    const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

    const qrImage = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(
      upiLink
    )}`;

    setQrUrl(qrImage);
  }, [amount]);

  // Handle Payment Confirmation
  const handleConfirmPayment = async () => {
    if (!userId) {
      alert("User ID missing! Login again.");
      return;
    }

    if (!courseId) {
      alert("Course ID missing!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, courseId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Payment confirmed! You are now enrolled in the course.");
        navigate("/my-courses");
      } else {
        alert(data.msg || "Payment confirmation failed.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border-t-4 border-blue-600">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Complete Your Payment 💳
        </h1>

        <p className="text-gray-700 mb-3">Amount to Pay:</p>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{1}</p>

        <p className="text-gray-900 mb-4">Scan the QR to pay</p>
      <p className="text-gray-600 mb-4">(pay with Google pay,Paytm,Phonepay or any UPI apps)</p>


        {/* QR Code */}
        <img
            src="https://i.ibb.co/SYnzzf3/Whats-App-Image-2025-11-11-at-6-22-39-PM.jpg"
          alt="UPI QR Code"
          className="w-56 h-56 mx-auto mb-5 shadow-lg border rounded-lg"
        />

        <p className="text-gray-700 mt-4">
          UPI ID:{" "}
          <span className="text-blue-700 font-semibold">
            9481012202@pthdfc
          </span>
        </p>

        <button
          onClick={handleConfirmPayment}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          I’ve Completed the Payment
        </button>
      </div>
    </div>
  );
}
