import { useEffect, useState } from "react";

export default function StudentReports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reports/student`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 My Learning Report</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="Enrolled Courses" value={data.totalCourses} />
        <Card title="Average Progress" value={`${data.avgProgress}%`} />
        <Card title="Certificates Earned" value={data.certificates} />
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Progress by Course</h2>
        <div className="space-y-4">
          {data.progressByCourse.map((c) => (
            <div key={c.courseId}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{c.courseTitle}</span>
                <span className="text-gray-500">{c.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${c.percent}%` }} />
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
