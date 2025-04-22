'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Games() {
  const { data: session } = useSession();

  const games = [
    {
      id: 1,
      title: 'Code Quiz',
      description: 'Teste dein Wissen über Programmierung und Algorithmen.',
      difficulty: 'Mittel',
      duration: '15 Minuten',
    },
    {
      id: 2,
      title: 'Debug Challenge',
      description: 'Finde und behebe Fehler in vorgegebenen Code-Snippets.',
      difficulty: 'Fortgeschritten',
      duration: '20 Minuten',
    },
    {
      id: 3,
      title: 'Memory Match',
      description: 'Finde passende Paare von Programmierkonzepten.',
      difficulty: 'Anfänger',
      duration: '10 Minuten',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lernspiele</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Schwierigkeit: {game.difficulty}</span>
                  <span>Dauer: {game.duration}</span>
                </div>
                {session ? (
                  <Link
                    href={`/games/${game.id}`}
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Spiel starten
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