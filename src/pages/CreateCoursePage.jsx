// src/pages/CreateCoursePage.jsx
import React, { useState } from "react";
import { apiFetch } from "../utils/api";

export default function CreateCoursePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMessage("Course created successfully 🎉");
      setForm({ title: "", description: "", thumbnail: "", price: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to create course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create New Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-xl space-y-4"
      >
        <input
          name="title"
          className="w-full p-3 border rounded"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="w-full p-3 border rounded"
          placeholder="Course Description"
          value={form.description}
          rows="4"
          onChange={handleChange}
        />

        <input
          name="thumbnail"
          className="w-full p-3 border rounded"
          placeholder="Thumbnail Image URL"
          value={form.thumbnail}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          className="w-full p-3 border rounded"
          placeholder="Course Price"
          value={form.price}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {message && (
          <p className="text-center text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
