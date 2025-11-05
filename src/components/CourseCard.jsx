import { motion } from "framer-motion";

export default function CourseCard({ title, description, price }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg p-5 border hover:shadow-2xl transition"
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-indigo-600">₹{price}</span>
        <a
          href="/payment"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Enroll
        </a>
      </div>
    </motion.div>
  );
}
