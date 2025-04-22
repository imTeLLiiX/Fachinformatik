'use client';

import { useState, useEffect } from 'react';
import { Course } from '@/types/course';
import Link from 'next/link';
import Image from 'next/image';

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center min-h-[400px]">{error}</div>;
  }

  if (courses.length === 0) {
    return <div className="text-center min-h-[400px]">No courses available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <Link 
          href={`/courses/${course._id}`} 
          key={course._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="relative h-48 w-full">
            <Image
              src={course.imageUrl || '/placeholder-course.svg'}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
                {course.difficulty}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {course.duration} min
              </span>
            </div>
            {course.rating && (
              <div className="mt-2 flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                  {course.rating.toFixed(1)}
                </span>
                {course.enrolledStudents && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({course.enrolledStudents} enrolled)
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 