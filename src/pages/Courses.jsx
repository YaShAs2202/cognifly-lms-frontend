import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();

  // ✅ Updated and verified image URLs (Pexels & Unsplash)
  const courses = [
    {
      title: "AI Foundations",
      description:
        "Learn the basics of Artificial Intelligence, machine learning, and neural networks.",
      price: 299,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Drone Technology 101",
      description:
        "Understand drone components, flight dynamics, and basic maintenance.",
      price: 249,
      image:
        "https://images.pexels.com/photos/3789878/pexels-photo-3789878.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Computer Vision with Drones",
      description:
        "Use AI to make drones detect, track, and recognize objects in real time.",
      price: 349,
      image:
        "https://images.pexels.com/photos/977296/pexels-photo-977296.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Deep Learning for Robotics",
      description:
        "Apply TensorFlow and PyTorch to build intelligent autonomous systems.",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1581091215367-59ab6a3c46dc?auto=format&fit=crop&w=800&q=60", // ✅ Robot AI Lab
    },
    {
      title: "Drone Programming with Python",
      description:
        "Learn to control drones programmatically using Python SDKs and APIs.",
      price: 299,
      image:
        "https://images.pexels.com/photos/1552352/pexels-photo-1552352.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "AI-Driven Aerial Mapping",
      description:
        "Use drones and AI for mapping, surveying, and environmental monitoring.",
      price: 349,
      image:
        "https://images.pexels.com/photos/10085647/pexels-photo-10085647.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const handleEnroll = (course) => {
    alert(`You selected: ${course.title}`);
    navigate("/payment");
  };

  return (
    <div className="p-10 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        AI & Drone Technology Courses
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Explore cutting-edge AI and Drone tech skills to advance your career 🚀
      </p>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <div
            key={index}
            onClick={() => handleEnroll(course)}
            className="relative bg-white rounded-2xl shadow-xl cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-2xl group"
          >
            {/* ✨ Enhanced Double Border with Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-4 border-gray-300 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.4)]"></div>
            <div className="absolute inset-1 rounded-2xl border-2 border-gray-600 transition-all duration-300 group-hover:border-blue-500"></div>

            {/* Inner Content */}
            <div className="relative z-10 p-6">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-xl mb-4 w-full h-44 object-cover border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/800x400.png?text=Course+Image';
                }}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-3">{course.description}</p>
              <p className="font-bold text-gray-800 mb-4">₹{course.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnroll(course);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
