'use client';

import { useState, useEffect } from 'react';
import { Module } from '@/app/courses/[courseId]/modules';
import { courseModules } from '@/app/courses/[courseId]/modules';

interface ModuleViewProps {
  moduleId: string;
}

export default function ModuleView({ moduleId }: ModuleViewProps) {
  // Finde das aktuelle Modul
  const module = courseModules.find(m => m.id === moduleId);
  if (!module) return <div>Modul nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{module.title}</h1>
      <p className="text-gray-600">{module.description}</p>
      
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
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Übungen</h2>
        {module.exercises.map((exercise, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">{exercise.title}</h3>
            <p className="text-gray-600 mt-2">{exercise.description}</p>
            {exercise.solution && (
              <div className="mt-4">
                <h4 className="font-medium">Lösung:</h4>
                <pre className="bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
                  <code>{exercise.solution}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Zeitlimit: {module.quiz.timeLimit}</p>
          <div className="mt-4 space-y-4">
            {module.quiz.questions.map((question, index) => (
              <div key={index} className="border-t pt-4">
                <p className="font-medium">{question.question}</p>
                <div className="mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-2">
                      <input type="radio" name={`question-${index}`} className="form-radio" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 