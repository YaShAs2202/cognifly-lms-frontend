export default function Certificate() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[40rem] text-center border-4 border-indigo-600">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Certificate of Completion</h1>
        <p className="text-lg text-gray-700">This is proudly presented to</p>
        <h2 className="text-3xl font-bold text-gray-900 my-4">John Doe</h2>
        <p className="text-lg text-gray-700">for successfully completing the course</p>
        <h3 className="text-2xl font-semibold text-indigo-600 mt-2">Full Stack Development</h3>
        <p className="text-gray-500 mt-6">Issued on: Sept 26, 2025</p>
      </div>
    </div>
  );
}
