import { useEffect, useState } from "react";

export default function TeacherReports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/teacher`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Instructor Analytics</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="Courses Managed" value={data.totalCourses} />
        <Card title="Avg course progress" value={`${avgOf(data.metrics.map(m => m.avgProgress))}%`} />
        <Card title="Total learners" value={data.metrics.reduce((s, m) => s + m.learners, 0)} />
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Courses</h2>
        <div className="space-y-4">
          {data.metrics.map((m) => (
            <div key={m.courseId} className="border rounded-lg p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{m.courseTitle}</span>
                <span className="text-gray-500">{m.avgProgress}% avg • {m.learners} learners</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="h-2 bg-emerald-600 rounded-full" style={{ width: `${m.avgProgress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-800 mt-2">{value}</div>
    </div>
  );
}

function avgOf(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((s, x) => s + x, 0) / arr.length);
}
