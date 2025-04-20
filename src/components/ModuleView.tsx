'use client';

import { useState } from 'react';
import { Module } from '@/app/courses/[courseId]/modules';
import { Exercise } from './Exercise';
import Quiz from './Quiz';
import Flashcards from './Flashcards';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface ModuleViewProps {
  module: Module;
  onComplete: () => void;
}

export default function ModuleView({ module, onComplete }: ModuleViewProps) {
  const [currentSection, setCurrentSection] = useState<'topics' | 'exercises' | 'quiz' | 'flashcards'>('topics');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const handleSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
      if (completedSections.length + 1 === 4) { // All sections completed
        onComplete();
      }
    }
  };

  const handleExerciseComplete = (correct: boolean) => {
    if (correct && currentExerciseIndex < module.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (correct) {
      handleSectionComplete('exercises');
    }
  };

  const handleQuizComplete = (score: number) => {
    if (score >= 0.7) { // 70% oder besser
      handleSectionComplete('quiz');
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'topics':
        return (
          <div className="space-y-4">
            {module.topics.map((topic, index) => (
              <Card key={index}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{topic.title}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {topic.content.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
            <Button onClick={() => handleSectionComplete('topics')}>
              Themen abgeschlossen
            </Button>
          </div>
        );
      case 'exercises':
        return (
          <div className="space-y-4">
            <Exercise
              id={module.exercises[currentExerciseIndex].id}
              title={module.exercises[currentExerciseIndex].title}
              description={module.exercises[currentExerciseIndex].description}
              solution={module.exercises[currentExerciseIndex].solution}
              onComplete={handleExerciseComplete}
            />
          </div>
        );
      case 'quiz':
        return (
          <Quiz
            questions={module.quiz.questions}
            timeLimit={parseInt(module.quiz.timeLimit)}
            onComplete={handleQuizComplete}
          />
        );
      case 'flashcards':
        return (
          <Flashcards
            cards={module.flashcards}
            onComplete={() => handleSectionComplete('flashcards')}
          />
        );
      default:
        return null;
    }
  };

  const progress = (completedSections.length / 4) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{module.title}</h2>
        <div className="text-sm text-gray-500">
          {completedSections.length} von 4 Abschnitten abgeschlossen
        </div>
      </div>

      <Progress value={progress} />

      <div className="flex space-x-2">
        <Button
          variant={currentSection === 'topics' ? 'default' : 'outline'}
          onClick={() => setCurrentSection('topics')}
        >
          Themen
        </Button>
        <Button
          variant={currentSection === 'exercises' ? 'default' : 'outline'}
          onClick={() => setCurrentSection('exercises')}
        >
          Übungen
        </Button>
        <Button
          variant={currentSection === 'quiz' ? 'default' : 'outline'}
          onClick={() => setCurrentSection('quiz')}
        >
          Quiz
        </Button>
        <Button
          variant={currentSection === 'flashcards' ? 'default' : 'outline'}
          onClick={() => setCurrentSection('flashcards')}
        >
          Karteikarten
        </Button>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
} 