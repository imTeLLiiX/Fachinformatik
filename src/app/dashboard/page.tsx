import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Dashboard from '@/components/Dashboard';
import { redirect } from 'next/navigation';

interface Course {
  title: string;
  modules: {
    id: string;
    title: string;
    description: string;
  }[];
}

interface Enrollment {
  course: Course;
}

interface UserProgress {
  completedCourses: number;
  overallProgress: number;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/auth/login');
  }

  // Hole Benutzerdaten mit Prisma
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              modules: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Benutzer nicht gefunden.</p>
      </div>
    );
  }

  // Parse user progress
  const progress: UserProgress = user.progress ? JSON.parse(user.progress as string) : {
    completedCourses: 0,
    overallProgress: 0
  };

  // Transformiere die Kurse und Module in das erwartete Format
  const modules = user.enrollments.flatMap((enrollment: Enrollment) => 
    enrollment.course.modules.map(module => ({
      id: module.id,
      title: module.title,
      subtitle: enrollment.course.title,
      description: module.description,
      progress: 0, // TODO: Implementiere die Fortschrittsverfolgung
      color: getRandomColor()
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Willkommen, {user.firstName || 'Student'}!</h1>
        <p className="text-gray-600">
          Hier ist dein persönliches Dashboard mit deinem Lernfortschritt.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dein Fortschritt</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">Abgeschlossene Kurse</p>
              <p className="text-2xl font-bold">
                {progress.completedCourses}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Gesamtfortschritt</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress.overallProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {progress.overallProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dashboard modules={modules} />
    </div>
  );
}

function getRandomColor() {
  const colors = [
    '#2563EB', // blue-600
    '#DC2626', // red-600
    '#059669', // emerald-600
    '#7C3AED', // violet-600
    '#EA580C', // orange-600
    '#0891B2', // cyan-600
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
} 