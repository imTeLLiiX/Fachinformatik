'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
}

export default function CoursesPage() {
  const { data: session } = useSession();

  const courses: Course[] = [
    {
      id: '1',
      title: 'HTML & CSS Grundlagen',
      description: 'Lernen Sie die Grundlagen der Webentwicklung mit HTML und CSS.',
      level: 'Anfänger',
      duration: '4 Wochen'
    },
    {
      id: '2',
      title: 'JavaScript Basics',
      description: 'Einführung in die Programmierung mit JavaScript.',
      level: 'Anfänger',
      duration: '6 Wochen'
    },
    {
      id: '3',
      title: 'React Fundamentals',
      description: 'Entwickeln Sie moderne Webanwendungen mit React.',
      level: 'Fortgeschritten',
      duration: '8 Wochen'
    },
    {
      id: '4',
      title: 'Backend Development',
      description: 'Server-seitige Entwicklung mit Node.js und Express.',
      level: 'Fortgeschritten',
      duration: '10 Wochen'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Verfügbare Kurse</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Level: {course.level}</span>
                <span>Dauer: {course.duration}</span>
              </div>
              {session ? (
                <Link
                  href={`/courses/${course.id}`}
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Zum Kurs
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="block w-full text-center py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Anmelden zum Starten
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 