'use client';

import { useState, useEffect } from 'react';
import { courseModules } from '@/app/courses/[courseId]/modules';

interface ModuleViewProps {
  courseId: string;
  moduleId: string;
}

export default function ModuleView({ courseId, moduleId }: ModuleViewProps) {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});
  const [showQuiz, setShowQuiz] = useState(false);

  // Finde das aktuelle Modul
  const module = courseModules[courseId]?.find(m => m.id === moduleId);
  if (!module) return <div>Modul nicht gefunden</div>;

  // Lade den Fortschritt aus dem localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${moduleId}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [moduleId]);

  // Speichere den Fortschritt
  const markComplete = (topicIndex: number, contentIndex: number) => {
    const key = `${topicIndex}_${contentIndex}`;
    const newProgress = { ...progress, [key]: true };
    setProgress(newProgress);
    localStorage.setItem(`progress_${moduleId}`, JSON.stringify(newProgress));
  };

  // Berechne den Gesamtfortschritt
  const calculateProgress = () => {
    const totalItems = module.topics.reduce((acc, topic) => 
      acc + topic.content.length + topic.exercises.length, 0);
    const completedItems = Object.values(progress).filter(v => v).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
        <p className="mt-2 text-gray-600">{module.description}</p>
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Fortschritt: {calculateProgress()}%
        </p>
      </div>

      <div className="space-y-8">
        {module.topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {topic.title}
            </h2>
            
            <div className="space-y-4">
              {topic.content.map((content, contentIndex) => (
                <div key={contentIndex} className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={progress[`${topicIndex}_${contentIndex}`] || false}
                    onChange={() => markComplete(topicIndex, contentIndex)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{content}</span>
                </div>
              ))}
            </div>

            {topic.exercises.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Übungen
                </h3>
                <div className="space-y-3">
                  {topic.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={progress[`${topicIndex}_ex_${exerciseIndex}`] || false}
                        onChange={() => markComplete(topicIndex, exercise.length + exerciseIndex)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {calculateProgress() === 100 && !showQuiz && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Abschlussquiz starten
          </button>
        </div>
      )}

      {showQuiz && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Abschlussquiz
          </h2>
          <p className="text-gray-600">
            {module.quiz.questions} Fragen in {module.quiz.timeLimit}
          </p>
          {/* Hier würde die Quiz-Komponente eingebunden werden */}
        </div>
      )}
    </div>
  );
} 