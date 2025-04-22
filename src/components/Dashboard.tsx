import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  color: string;
}

interface DashboardProps {
  modules: Module[];
}

const Dashboard: React.FC<DashboardProps> = ({ modules }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lernmodule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="flex flex-col">
            <CardHeader 
              className="text-white" 
              style={{ backgroundColor: module.color }}
            >
              <h2 className="text-xl font-bold">{module.title}</h2>
              <p className="text-sm opacity-90">{module.subtitle}</p>
            </CardHeader>
            <CardContent className="flex-grow py-4">
              <p className="text-gray-600 mb-4">{module.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Fortschritt: {module.progress}%
                </p>
                <Progress value={module.progress} className="w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/courses/${module.id}`} className="w-full">
                <Button className="w-full" variant="default">
                  Zum Modul
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 