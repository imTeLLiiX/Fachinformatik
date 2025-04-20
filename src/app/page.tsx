'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Willkommen bei der IT-Learning Platform
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Kurse</h2>
            <p className="text-gray-600 mb-4">
              Entdecke unsere vielfältigen Kurse zu verschiedenen IT-Themen.
            </p>
            <Link
              href="/courses"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Zu den Kursen
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lernspiele</h2>
            <p className="text-gray-600 mb-4">
              Lerne spielerisch mit unseren interaktiven Lernspielen.
            </p>
            <Link
              href="/games"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Zu den Spielen
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Premium</h2>
            <p className="text-gray-600 mb-4">
              Erhalte Zugang zu allen Premium-Inhalten mit einem Premium-Account.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Zum Shop
            </Link>
          </div>
        </div>

        {!session && (
          <div className="mt-12 text-center">
            <p className="text-xl mb-4">
              Melde dich an, um alle Funktionen nutzen zu können!
            </p>
            <div className="space-x-4">
              <Link
                href="/auth/login"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Anmelden
              </Link>
              <Link
                href="/auth/register"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Registrieren
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 