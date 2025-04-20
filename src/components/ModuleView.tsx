'use client';

import { useState, useEffect } from 'react';
import Flashcards from './Flashcards';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: {
    title: string;
    content: string[];
    exercises: string[];
  }[];
  quiz: {
    questions: number;
    timeLimit: string;
    questionIds: string[];
  };
  flashcards: {
    question: string;
    answer: string;
  }[];
}

interface ModuleViewProps {
  moduleId: string;
}

export default function ModuleView({ moduleId }: ModuleViewProps) {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'flashcards'>('content');

  useEffect(() => {
    async function loadModule() {
      try {
        const response = await fetch('/api/modules');
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Module');
        }
        const modules = await response.json();
        const currentModule = modules.find((m: Module) => m.id === moduleId);
        if (!currentModule) {
          throw new Error('Modul nicht gefunden');
        }
        setModule(currentModule);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      } finally {
        setLoading(false);
      }
    }

    loadModule();
  }, [moduleId]);

  if (loading) {
    return <div>Lade Modul...</div>;
  }

  if (error) {
    return <div>Fehler: {error}</div>;
  }

  if (!module) {
    return <div>Modul nicht gefunden</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{module.title}</h1>
      <p className="text-gray-600">{module.description}</p>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inhalte
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'flashcards'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Karteikarten
          </button>
        </nav>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Themen</h2>
            {module.topics.map((topic, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium">{topic.title}</h3>
                <ul className="list-disc list-inside mt-2">
                  {topic.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">{item}</li>
                  ))}
                </ul>
                {topic.exercises && topic.exercises.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium">Übungen:</h4>
                    <ul className="list-disc list-inside mt-2">
                      {topic.exercises.map((exercise, exerciseIndex) => (
                        <li key={exerciseIndex} className="text-gray-600">{exercise}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quiz</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Zeitlimit: {module.quiz.timeLimit}</p>
              <p className="text-gray-600">Anzahl Fragen: {module.quiz.questions}</p>
            </div>
          </div>
        </div>
      ) : (
        <Flashcards flashcards={module.flashcards} />
      )}
    </div>
  );
} 