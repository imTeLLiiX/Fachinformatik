'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  modules: number;
  isPremium: boolean;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Erneut versuchen
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="mt-2">{course.description}</CardDescription>
              </div>
              {course.isPremium && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Premium
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Schwierigkeit:</span>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Dauer:</span>
                <span>{course.duration} Stunden</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Module:</span>
                <span>{course.modules}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/courses/${course.id}`} className="w-full">
              <Button className="w-full">
                Zum Kurs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 