import CourseCard from "../components/CourseCard";

const dummyCourses = [
  { id: 1, title: "Java Basics", description: "Learn the fundamentals of Java" },
  { id: 2, title: "React for Beginners", description: "Build web apps with React" }
];

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dummyCourses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
