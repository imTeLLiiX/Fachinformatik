'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Courses() {
  const { data: session } = useSession();

  const courses = [
    {
      id: 1,
      title: 'Grundlagen der Informatik',
      description: 'Lerne die Basics der Informatik und Programmierung.',
      level: 'Anfänger',
      duration: '8 Wochen',
    },
    {
      id: 2,
      title: 'Webentwicklung',
      description: 'Entwickle moderne Webanwendungen mit HTML, CSS und JavaScript.',
      level: 'Fortgeschritten',
      duration: '12 Wochen',
    },
    {
      id: 3,
      title: 'Datenbanken',
      description: 'Lerne den Umgang mit SQL und NoSQL Datenbanken.',
      level: 'Mittel',
      duration: '10 Wochen',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Kurse</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Level: {course.level}</span>
                  <span>Dauer: {course.duration}</span>
                </div>
                {session ? (
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Kurs starten
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Anmelden erforderlich
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 