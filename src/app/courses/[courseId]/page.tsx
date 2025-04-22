'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Module } from './modules';
import ModuleView from '@/components/ModuleView';

type CourseParams = {
  [key: string]: string | string[];
}

export default function CoursePage() {
  const params = useParams<CourseParams>();
  const courseId = params?.courseId ? (params.courseId as string) : '';
  const { isAuthenticated } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  useEffect(() => {
    async function loadModules() {
      try {
        console.log('Starting to load modules...');
        console.log('Course ID:', courseId);
        console.log('Is authenticated:', isAuthenticated);

        if (!courseId) {
          throw new Error('Keine Kurs-ID gefunden');
        }

        const apiUrl = `/api/modules?courseId=${courseId}`;
        console.log('Fetching from URL:', apiUrl);

        const response = await fetch(apiUrl);
        console.log('API Response status:', response.status);
        console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Fehler beim Laden der Module');
        }
        
        const data = await response.json();
        console.log('Loaded modules data:', data);
        
        if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          throw new Error('Ungültiges Datenformat für Module');
        }
        
        setModules(data);
        if (data.length > 0 && !selectedModuleId) {
          console.log('Setting first module as selected:', data[0].id);
          setSelectedModuleId(data[0].id);
        }
      } catch (err) {
        console.error('Error in loadModules:', err);
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      loadModules();
    }
  }, [courseId, selectedModuleId, isAuthenticated]);

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

  if (loading) {
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>Keine Module für diesen Kurs verfügbar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Module Navigation */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Module</h2>
          <nav className="space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModuleId(module.id)}
                className={`w-full text-left px-4 py-2 rounded ${
                  selectedModuleId === module.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {module.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Module Content */}
        <div className="md:col-span-3">
          {selectedModuleId ? (
            <ModuleView 
              module={modules.find(m => m.id === selectedModuleId)!}
              onComplete={() => {
                // Handle module completion
                console.log('Module completed:', selectedModuleId);
              }}
            />
          ) : (
            <div className="bg-gray-100 p-4 rounded">
              <p>Bitte wählen Sie ein Modul aus.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 