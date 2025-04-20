'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type CourseParams = {
  [key: string]: string | string[];
}

export default function CoursePage() {
  const params = useParams<CourseParams>();
  const courseId = params?.courseId ? (params.courseId as string) : '';
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState<{
    title: string;
    content: string;
    level: string;
    duration: string;
  } | null>(null);

  useEffect(() => {
    if (!courseId) return;
    
    // Hier würden wir normalerweise die Kursdaten von der API laden
    // Für dieses Beispiel verwenden wir Mockdaten
    setCourse({
      title: 'Beispielkurs',
      content: 'Dieser Kurs behandelt wichtige Themen der IT.',
      level: 'Fortgeschritten',
      duration: '8 Wochen'
    });
  }, [courseId]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>Bitte melden Sie sich an, um diesen Kurs zu sehen.</p>
        </div>
      </div>
    );
  }

  if (!courseId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>Ungültige Kurs-ID</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex gap-4 text-sm text-gray-600 mb-6">
        <span>Niveau: {course.level}</span>
        <span>Dauer: {course.duration}</span>
      </div>
      <div className="prose max-w-none">
        <p>{course.content}</p>
      </div>
    </div>
  );
} 