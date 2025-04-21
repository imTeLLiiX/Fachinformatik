import { connectToDatabase } from '@/lib/mongodb';
import Dashboard from '@/components/Dashboard';

async function getCourses() {
  try {
    const { db } = await connectToDatabase();
    const courses = await db.collection('courses').find({}).toArray();
    return courses.map(course => ({
      id: course.id,
      title: course.title,
      subtitle: course.category,
      description: course.description,
      progress: 0,
      color: course.color
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const modules = await getCourses();
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard modules={modules} />
    </main>
  );
} 