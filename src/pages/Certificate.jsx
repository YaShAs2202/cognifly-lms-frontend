import { useState } from "react";

export default function Certificate() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  // Replace with selected courseId (e.g., from route or a dropdown)
  const [courseId, setCourseId] = useState("");

  const handleGenerate = async () => {
    if (!courseId) {
      alert("Select a course to generate certificate");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/certificates/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (res.ok) {
        setDownloadUrl(`${import.meta.env.VITE_API_BASE_URL}${data.download}`);
      } else {
        alert(data.message || "Failed to generate");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🎓 Certificates</h1>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200 max-w-xl">
        <label className="block text-sm text-gray-600 mb-2">Course ID</label>
        <input
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="Paste a courseId"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Certificate"}
        </button>

        {downloadUrl && (
          <button onClick={handleDownload} className="ml-3 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}
