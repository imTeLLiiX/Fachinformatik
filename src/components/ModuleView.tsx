'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
}

interface ModuleViewProps {
  moduleId: string;
}

export default function ModuleView({ moduleId }: ModuleViewProps) {
  const params = useParams();
  const courseId = params?.courseId as string;
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');

  useEffect(() => {
    async function loadModule() {
      try {
        console.log('Loading module data for moduleId:', moduleId);
        const response = await fetch(`/api/modules?courseId=${courseId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Fehler beim Laden der Module');
        }
        
        const modules = await response.json();
        console.log('Loaded modules:', modules);
        
        const currentModule = modules.find((m: Module) => m.id === moduleId);
        if (!currentModule) {
          throw new Error('Modul nicht gefunden');
        }
        
        console.log('Current module:', currentModule);
        setModule(currentModule);
      } catch (err) {
        console.error('Error loading module:', err);
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      } finally {
        setLoading(false);
      }
    }

    if (moduleId && courseId) {
      loadModule();
    }
  }, [moduleId, courseId]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p>Modul nicht gefunden</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-600 mb-4">{module.description}</p>
        <div className="text-sm text-gray-500">Dauer: {module.duration}</div>
      </div>

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
            onClick={() => setActiveTab('quiz')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quiz'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Quiz
          </button>
        </nav>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-6">
          {module.topics.map((topic, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{topic.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Inhalt:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {topic.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
                {topic.exercises && topic.exercises.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Übungen:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {topic.exercises.map((exercise, exerciseIndex) => (
                        <li key={exerciseIndex} className="text-gray-600">{exercise}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quiz</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Zeitlimit: {module.quiz.timeLimit}</p>
            <p className="text-gray-600">Anzahl Fragen: {module.quiz.questions}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                // TODO: Implement quiz start functionality
                alert('Quiz-Funktion wird bald verfügbar sein!');
              }}
            >
              Quiz starten
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 