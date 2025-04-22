'use client';

import React from 'react';
import ModuleManagement from '@/components/admin/ModuleManagement';

interface PageProps {
  params: {
    courseId: string;
  };
}

export default function CourseModulesPage({ params }: PageProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Modules</h1>
      <ModuleManagement courseId={params.courseId} />
    </div>
  );
} 