import CourseList from '@/components/CourseList';

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      <CourseList />
    </div>
  );
} 