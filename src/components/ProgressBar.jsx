export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-lg">
      <div
        className="bg-green-500 h-3 rounded-lg"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
