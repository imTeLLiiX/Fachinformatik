'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  status: 'available' | 'coming-soon' | 'premium';
}

export default function LearningToolsPage() {
  const [tools] = useState<Tool[]>([
    {
      id: 'code-editor',
      title: 'Code Editor',
      description: 'Interaktiver Code-Editor mit Syntax-Highlighting und Live-Vorschau',
      icon: '💻',
      path: '/lern-tools/code-editor',
      status: 'available'
    },
    {
      id: 'flashcards',
      title: 'Karteikarten',
      description: 'Erstelle und lerne mit personalisierten Karteikarten',
      icon: '📝',
      path: '/lern-tools/flashcards',
      status: 'available'
    },
    {
      id: 'quiz-generator',
      title: 'Quiz Generator',
      description: 'Erstelle eigene Quizze und teste dein Wissen',
      icon: '❓',
      path: '/lern-tools/quiz-generator',
      status: 'coming-soon'
    },
    {
      id: 'code-challenges',
      title: 'Code Challenges',
      description: 'Löse Programmieraufgaben und verbessere deine Fähigkeiten',
      icon: '🧩',
      path: '/lern-tools/code-challenges',
      status: 'premium'
    },
    {
      id: 'collaborative-learning',
      title: 'Kollaboratives Lernen',
      description: 'Lerne gemeinsam mit anderen in Echtzeit',
      icon: '👥',
      path: '/lern-tools/collaborative-learning',
      status: 'premium'
    },
    {
      id: 'progress-tracker',
      title: 'Fortschritts-Tracker',
      description: 'Verfolge deinen Lernfortschritt und setze Ziele',
      icon: '📊',
      path: '/lern-tools/progress-tracker',
      status: 'available'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Verfügbar</span>;
      case 'coming-soon':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Demnächst</span>;
      case 'premium':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Premium</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lern-Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecke unsere interaktiven Lernwerkzeuge, die dir helfen, effektiver zu lernen und deine IT-Kenntnisse zu verbessern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  {getStatusBadge(tool.status)}
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Hier können zusätzliche Informationen oder Vorschauen angezeigt werden */}
              </CardContent>
              <CardFooter>
                {tool.status === 'available' ? (
                  <Link href={tool.path} className="w-full">
                    <Button className="w-full">Öffnen</Button>
                  </Link>
                ) : tool.status === 'premium' ? (
                  <Link href="/shop" className="w-full">
                    <Button className="w-full" variant="outline">Premium erforderlich</Button>
                  </Link>
                ) : (
                  <Button className="w-full" variant="outline" disabled>Demnächst verfügbar</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 