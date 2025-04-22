import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, BookOpen, Lock, Unlock } from 'lucide-react';

// TODO: Replace with real data from database
const modules = [
  {
    id: 'html-css-1',
    title: 'HTML & CSS Grundlagen',
    description: 'Lernen Sie die Basics von HTML und CSS',
    status: 'published',
    topics: 10,
    exercises: 15,
    quizzes: 5,
    flashcards: 20,
    lastUpdated: '2024-02-20'
  },
  {
    id: 'javascript-1',
    title: 'JavaScript Einführung',
    description: 'Erste Schritte mit JavaScript',
    status: 'draft',
    topics: 8,
    exercises: 12,
    quizzes: 4,
    flashcards: 15,
    lastUpdated: '2024-02-19'
  },
  // Add more mock modules as needed
];

export default function ModulesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Module</h1>
          <p className="text-gray-500">Verwalten Sie die Lernmodule der Plattform</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Neues Modul
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modulliste</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Module suchen..."
                className="pl-8"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Titel</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Topics</th>
                  <th className="text-left py-3 px-4">Übungen</th>
                  <th className="text-left py-3 px-4">Quizze</th>
                  <th className="text-left py-3 px-4">Karteikarten</th>
                  <th className="text-left py-3 px-4">Zuletzt aktualisiert</th>
                  <th className="text-left py-3 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-500">{module.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        module.status === 'published' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {module.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{module.topics}</td>
                    <td className="py-3 px-4">{module.exercises}</td>
                    <td className="py-3 px-4">{module.quizzes}</td>
                    <td className="py-3 px-4">{module.flashcards}</td>
                    <td className="py-3 px-4">{module.lastUpdated}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        Bearbeiten
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={module.status === 'published' ? 'text-red-600' : 'text-green-600'}
                      >
                        {module.status === 'published' ? (
                          <>
                            <Lock className="w-4 h-4 mr-1" />
                            Sperren
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4 mr-1" />
                            Veröffentlichen
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 