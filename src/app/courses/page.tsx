import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import components
const CourseList = dynamic(() => import('@/components/courses/CourseList'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  ),
  ssr: true
});

const CourseFilters = dynamic(() => import('@/components/courses/CourseFilters'), {
  loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded-lg"></div>,
  ssr: false
});

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Verfügbare Kurse
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-[200px] bg-gray-100 animate-pulse rounded-lg"></div>}>
              <CourseFilters />
            </Suspense>
          </div>
          
          <div className="lg:col-span-3">
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            }>
              <CourseList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
} 