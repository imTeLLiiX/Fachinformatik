'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bitte melden Sie sich an</h1>
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Zum Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Mein Fortschritt</h2>
            <p className="text-gray-600 mb-4">
              Verfolge deinen Lernfortschritt und deine Erfolge.
            </p>
            <Link
              href="/progress"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Fortschritt anzeigen
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Aktive Kurse</h2>
            <p className="text-gray-600 mb-4">
              Fahre mit deinen laufenden Kursen fort.
            </p>
            <Link
              href="/courses"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Zu den Kursen
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lernspiele</h2>
            <p className="text-gray-600 mb-4">
              Teste dein Wissen in spielerischen Quizzen.
            </p>
            <Link
              href="/games"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Zu den Spielen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 