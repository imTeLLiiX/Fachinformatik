'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
}

export default function GamesPage() {
  const { data: session } = useSession();

  const games: Game[] = [
    {
      id: '1',
      title: 'HTML Tag Quiz',
      description: 'Testen Sie Ihr Wissen über HTML-Tags und deren Verwendung.',
      difficulty: 'Einfach',
      category: 'HTML'
    },
    {
      id: '2',
      title: 'CSS Selektoren Challenge',
      description: 'Üben Sie CSS-Selektoren in interaktiven Aufgaben.',
      difficulty: 'Mittel',
      category: 'CSS'
    },
    {
      id: '3',
      title: 'JavaScript Logik-Rätsel',
      description: 'Lösen Sie knifflige JavaScript-Programmieraufgaben.',
      difficulty: 'Schwer',
      category: 'JavaScript'
    },
    {
      id: '4',
      title: 'Responsive Design Simulator',
      description: 'Trainieren Sie responsives Webdesign in der Praxis.',
      difficulty: 'Mittel',
      category: 'CSS'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Lernspiele</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Schwierigkeit: {game.difficulty}</span>
                <span>Kategorie: {game.category}</span>
              </div>
              {session ? (
                <Link
                  href={`/games/${game.id}`}
                  className="block w-full text-center py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Spiel starten
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="block w-full text-center py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Anmelden zum Spielen
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 