import React, { useState } from "react";
// FIX: We are commenting out the external import for ProgressBar 
//      and providing a simple component here to ensure the page loads.
// import ProgressBar from "../components/ProgressBar"; 
import { useNavigate } from "react-router-dom";

// Temporary ProgressBar Component to prevent "module not found" error
const ProgressBar = ({ progress }) => (
  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
    <div 
      className="bg-blue-500 h-2 transition-all duration-500" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default function CourseDemo() {
  const navigate = useNavigate();

  // State to hold the student's name
  const [studentName, setStudentName] = useState("");

  const lessons = [
    { 
      title: "1. AI, ML, DL, and GenAI Explained", 
      content: "https://www.youtube.com/embed/qYNweeDHiyU", 
      type: "youtube"
    },
    { 
      title: "2. AI Basics for Beginners (Full Course)", 
      content: "https://www.youtube.com/embed/VGFpV3Qj4as", 
      type: "youtube"
    },
    { 
      title: "3. How AI works in everyday life (Google AI)", 
      content: "https://www.youtube.com/embed/oJC8VIDSx_Q", 
      type: "youtube"
    }
  ];

  const [currentLesson, setCurrentLesson] = useState(0);

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleCertificate = () => {
    if (!studentName.trim()) {
      alert("Please enter your name to receive the certificate.");
      return;
    }
    
    // Store the name and course title in localStorage
    localStorage.setItem(
      "completedCourse",
      JSON.stringify({ title: "AI Free Demo Course", student: studentName })
    );

    // Redirect to the certificate page using navigate
    navigate("/certificate");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🚀 AI Foundations - Free Demo Course
      </h1>

      {/* REMOVED: The Thumbnail (img tag) and the italic descriptive paragraph 
        to improve aesthetic and focus on the lessons/video player. 
      */}

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar progress={progress} />
        <p className="text-center mt-2 font-semibold text-gray-600">
          Lesson {currentLesson + 1} of {lessons.length} | Progress: {progress}%
        </p>
      </div>
      
      {/* Lesson Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        {lessons[currentLesson].title}
      </h2>

      {/* Conditional Video Player */}
      {lessons[currentLesson].type === "youtube" ? (
        // Use iframe for YouTube links
        <iframe
          width="100%"
          height="400"
          src={lessons[currentLesson].content}
          title={lessons[currentLesson].title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg shadow-xl mb-6"
        ></iframe>
      ) : (
        // Use standard video tag for MP4 links
        <video
          controls
          className="w-full rounded-lg shadow-xl mb-6"
          src={lessons[currentLesson].content}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-10">
        {/* Previous Button */}
        {currentLesson > 0 ? (
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition shadow-md"
          >
            ← Previous
          </button>
        ) : (
          // Placeholder to maintain spacing when on Lesson 1
          <div className="w-0"></div> 
        )}

        {/* Next/Complete Button */}
        {currentLesson < lessons.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Next Lesson ({lessons[currentLesson + 1].title}) →
          </button>
        ) : (
          <div className="w-1/2 ml-auto">
            {/* Input field for student's name */}
            <h3 className="text-xl font-semibold mb-3 text-center text-gray-700">Enter your name for the certificate:</h3>
            <input
              type="text"
              placeholder="Your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg"
            />
            
            <button
              onClick={handleCertificate}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition shadow-md"
            >
              ✔ Complete Course & Get Certificate
            </button>
          </div>
        )}
      </div>

      <hr className="mb-8" />
      
      {/* -----------------------------------------
          Static Resources (PDF Download)
      ------------------------------------------*/}

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">📄 Demo PDF Notes</h2>
      {/* PDF Download Button - ENHANCED */}
      <a
        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-full text-center inline-block 
          bg-green-500 text-white font-bold 
          py-3 px-6 rounded-lg 
          shadow-lg hover:bg-green-600 hover:shadow-xl 
          transition-all duration-300
        "
      >
        ⬇️ Download AI Intro Notes
      </a>
    </div>
  );
}