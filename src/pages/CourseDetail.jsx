import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-xl font-bold">Course Detail: {id}</h1>
      <p>Here you will see course videos, PDFs, and progress tracking.</p>
    </div>
  );
}
