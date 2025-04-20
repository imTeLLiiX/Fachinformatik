'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { quizQuestions } from './quizQuestions';

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const percentage = (score / totalQuestions) * 100;
    console.log(`Quiz completed with score: ${percentage}%`);
    // Here you would typically save the score to your backend
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Zugriff verweigert</h1>
        <p className="text-gray-600">
          Bitte melde dich an, um auf diesen Kurs zuzugreifen.
        </p>
      </div>
    );
  }

  const courseQuestions = quizQuestions[courseId] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Quiz: {courseId.charAt(0).toUpperCase() + courseId.slice(1)}
      </h1>
      <Quiz
        questions={courseQuestions}
        timeLimit={30}
        onComplete={handleQuizComplete}
      />
    </div>
  );
} 