'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  solution?: string;
  onComplete: (correct: boolean) => void;
}

export function Exercise({ title, description, solution, onComplete }: Exercise) {
  const [showSolution, setShowSolution] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const handleCheck = () => {
    setShowSolution(true);
    // For now, we'll just mark it as correct when they check
    setIsCorrect(true);
    onComplete(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        {solution && !showSolution && (
          <Button onClick={handleCheck}>Lösung überprüfen</Button>
        )}
        {showSolution && solution && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Lösung:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {solution}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 