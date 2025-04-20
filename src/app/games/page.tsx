'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: string;
}

export default function GamesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'Tower Quiz',
      description: 'Testen Sie Ihr Wissen in einem spannenden Quiz-Turm.',
      difficulty: 'Mittel',
      category: 'Quiz',
    },
    {
      id: '2',
      title: 'Code Puzzle',
      description: 'Lösen Sie Programmieraufgaben in einem spielerischen Format.',
      difficulty: 'Schwer',
      category: 'Programmierung',
    },
    {
      id: '3',
      title: 'Netzwerk Challenge',
      description: 'Lernen Sie Netzwerkkonzepte durch ein interaktives Spiel.',
      difficulty: 'Mittel',
      category: 'Netzwerke',
    },
    {
      id: '4',
      title: 'Sicherheits-Quiz',
      description: 'Testen Sie Ihr Wissen über Cybersicherheit.',
      difficulty: 'Einfach',
      category: 'Sicherheit',
    },
  ]);

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Lernspiele
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Lernen Sie IT-Konzepte auf spielerische Weise.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{game.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{game.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {game.difficulty}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {game.category}
                </span>
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6">
              {isAuthenticated ? (
                <Link
                  href={`/games/${game.id}`}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Spiel starten
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Anmelden für Zugang
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 