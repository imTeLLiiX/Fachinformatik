import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Bitte melden Sie sich an, um Ihr Dashboard zu sehen.</p>
      </div>
    );
  }

  // Hole Benutzerdaten mit Prisma
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      courses: true,
      progress: true
    }
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Benutzer nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Willkommen, {user.firstName}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fortschrittsübersicht */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ihr Fortschritt</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Abgeschlossene Kurse</p>
              <p className="text-2xl font-bold">{user.progress?.completedCourses || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Gesamtfortschritt</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${user.progress?.overallProgress || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{user.progress?.overallProgress || 0}%</p>
            </div>
          </div>
        </div>
        
        {/* Aktuelle Kurse */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Aktuelle Kurse</h2>
          {user.courses.length > 0 ? (
            <ul className="space-y-3">
              {user.courses.map(course => (
                <li key={course.id} className="border-b pb-2">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Sie haben noch keine Kurse begonnen.</p>
          )}
        </div>
        
        {/* Premium-Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Premium-Status</h2>
          {user.isPremium ? (
            <div className="text-green-600">
              <p className="font-medium">Sie haben Premium-Zugang</p>
              <p className="text-sm mt-1">Genießen Sie alle Vorteile!</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Sie haben Standard-Zugang</p>
              <a 
                href="/shop" 
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upgrade auf Premium
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 