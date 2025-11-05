// src/components/Hero.jsx
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Left Content */}
      <div className="max-w-lg space-y-6">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          Learn. Grow. Succeed.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl"
        >
          Join thousands of students learning the latest skills with our expert-designed courses.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Explore Courses →
        </motion.button>
      </div>

      {/* Right Illustration */}
      <motion.img
        src="/hero-illustration.png" // put any image inside `public/` folder
        alt="Learning illustration"
        className="w-80 md:w-[400px] mt-10 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
    </section>
  );
}

export default Hero;
