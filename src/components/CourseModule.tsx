'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  };
}

interface CourseModuleProps {
  module: Module;
  courseId: string;
  isAuthenticated: boolean;
}

export default function CourseModule({ module, courseId, isAuthenticated }: CourseModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{module.description}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {module.duration}
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-500"
        >
          {isExpanded ? 'Details ausblenden' : 'Details anzeigen'}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-6">
            {/* Topics */}
            <div>
              <h4 className="text-sm font-medium text-gray-900">Lerninhalte:</h4>
              <ul className="mt-2 space-y-4">
                {module.topics.map((topic, index) => (
                  <li key={index} className="bg-gray-50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-900">{topic.title}</h5>
                    <ul className="mt-2 space-y-2">
                      {topic.content.map((item, contentIndex) => (
                        <li key={contentIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {topic.exercises.length > 0 && (
                      <div className="mt-3">
                        <h6 className="text-sm font-medium text-gray-900">Übungen:</h6>
                        <ul className="mt-1 space-y-1">
                          {topic.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="mr-2">→</span>
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz Information */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-indigo-900">Abschlussquiz:</h4>
              <p className="mt-1 text-sm text-indigo-700">
                {module.quiz.questions} Fragen in {module.quiz.timeLimit}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          {isAuthenticated ? (
            <Link
              href={`/courses/${courseId}/modules/${module.id}`}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Modul starten
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
    </div>
  );
} 