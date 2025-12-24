import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const [qrUrl, setQrUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  // Values saved earlier
  const userId = localStorage.getItem("userId");
  const courseId = localStorage.getItem("selectedCourseId");
  const amount = localStorage.getItem("selectedCoursePrice") || 399;

  // Generate QR code
  useEffect(() => {
    const upiID = "9481012202@pthdfc";
    const name = "Yashas";
    const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

    const qrImage = `https://i.ibb.co/SYnzzf3/Whats-App-Image-2025-11-11-at-6-22-39-PM.jpg=${encodeURIComponent(
      upiLink
    )}`;

    setQrUrl(qrImage);
  }, [amount]);

  // Handle Payment Confirmation
  const handleConfirmPayment = async () => {
    setMessage("");
    setMessageType("");

    if (!userId) {
      setMessage("⚠️ Please login again to continue payment.");
      setMessageType("error");
      return;
    }

    if (!courseId) {
      setMessage("⚠️ Course information missing. Please select a course again.");
      setMessageType("error");
      return;
    }

    setLoading(true);

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
        setMessage("✅ Payment successful! You are now enrolled in the course.");
        setMessageType("success");

        // Redirect after short delay
        setTimeout(() => {
          navigate("/my-courses");
        }, 1500);
      } else {
        setMessage(data.msg || "❌ Payment confirmation failed.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setMessage("❌ Server error. Please try again later.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border-t-4 border-blue-600">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          Complete Your Payment 💳
        </h1>

        <p className="text-gray-700 mb-2">Amount to Pay</p>
        <p className="text-3xl font-bold text-green-600 mb-4">₹{amount}</p>

        <p className="text-gray-900 mb-1">Scan the QR to pay</p>
        <p className="text-gray-600 mb-4 text-sm">
          (Pay with Google Pay / PhonePe / Paytm / Any UPI App)
        </p>

        {/* QR Code */}
        <img
          src={qrUrl}
          alt="UPI QR Code"
          className="w-56 h-56 mx-auto mb-5 shadow-lg border rounded-lg"
        />

        <p className="text-gray-700 mt-3">
          UPI ID:{" "}
          <span className="text-blue-700 font-semibold">
            9481012202@pthdfc
          </span>
        </p>

        {/* Success / Error Message */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              messageType === "success"
                ? "text-green-800"
                : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying Payment..." : "I’ve Completed the Payment"}
        </button>
      </div>
    </div>
  );
}
