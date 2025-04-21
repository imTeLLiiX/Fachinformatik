'use client';

import React, { useState, useEffect } from 'react';
import { Module } from '@/app/courses/[courseId]/modules';
import { Exercise } from './Exercise';
import Quiz, { QuizQuestion } from './Quiz';
import Flashcards, { Flashcard } from './Flashcards';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ModuleViewProps {
  module: Module;
  onComplete?: (moduleId: string) => void;
}

export function ModuleView({ module, onComplete }: ModuleViewProps) {
  const [activeTab, setActiveTab] = useState('topics');
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Berechne den Fortschritt basierend auf den abgeschlossenen Abschnitten
  useEffect(() => {
    const totalSections = 4; // topics, exercises, quiz, flashcards
    const completedCount = Object.values(completedSections).filter(Boolean).length;
    setProgress((completedCount / totalSections) * 100);
  }, [completedSections]);

  // Markiere einen Abschnitt als abgeschlossen
  const handleSectionComplete = (section: string) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: true
    }));

    // Prüfe, ob alle Abschnitte abgeschlossen sind
    const allSections = ['topics', 'exercises', 'quiz', 'flashcards'];
    const allCompleted = allSections.every(section => 
      section === 'topics' || completedSections[section] || section === 'topics'
    );

    if (allCompleted && onComplete) {
      onComplete(module.id);
    }
  };

  // Markiere eine Übung als abgeschlossen
  const handleExerciseComplete = (exerciseId: string, isCorrect: boolean) => {
    if (isCorrect) {
      handleSectionComplete('exercises');
    }
  };

  // Markiere ein Quiz als abgeschlossen
  const handleQuizComplete = (score: number) => {
    if (score >= 70) { // Mindestens 70% richtig
      handleSectionComplete('quiz');
    }
  };

  // Markiere Karteikarten als abgeschlossen
  const handleFlashcardsComplete = () => {
    handleSectionComplete('flashcards');
  };

  // Rendere den Inhalt basierend auf dem aktiven Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'topics':
        return (
          <div className="space-y-4">
            {module.topics.map(topic => (
              <Card key={topic.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{topic.content}</p>
                </CardContent>
              </Card>
            ))}
            <Button 
              onClick={() => handleSectionComplete('topics')}
              className="w-full"
              disabled={completedSections.topics}
            >
              {completedSections.topics ? 'Themen abgeschlossen' : 'Themen abschließen'}
            </Button>
          </div>
        );
      case 'exercises':
        return (
          <div className="space-y-4">
            {module.exercises.map(exercise => (
              <Card key={exercise.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Lösung:</h4>
                    <pre className="whitespace-pre-wrap">{exercise.solution}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleExerciseComplete(exercise.id, true)}
                    className="w-full"
                    disabled={completedSections.exercises}
                  >
                    {completedSections.exercises ? 'Übung abgeschlossen' : 'Übung abschließen'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{module.quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {module.quiz.questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <h3 className="font-medium">{index + 1}. {question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              id={`${question.id}-${optionIndex}`} 
                              name={question.id} 
                              value={option}
                              className="h-4 w-4"
                            />
                            <label htmlFor={`${question.id}-${optionIndex}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleQuizComplete(100)}
                  className="w-full"
                  disabled={completedSections.quiz}
                >
                  {completedSections.quiz ? 'Quiz abgeschlossen' : 'Quiz abschließen'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      case 'flashcards':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{module.flashcards.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.flashcards.cards.map(card => (
                    <div key={card.id} className="border rounded-md p-4">
                      <div className="font-medium mb-2">Vorderseite:</div>
                      <p className="mb-4">{card.front}</p>
                      <div className="font-medium mb-2">Rückseite:</div>
                      <p>{card.back}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleFlashcardsComplete}
                  className="w-full"
                  disabled={completedSections.flashcards}
                >
                  {completedSections.flashcards ? 'Karteikarten abgeschlossen' : 'Karteikarten abschließen'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  // Mobile-Ansicht mit Accordion
  if (isMobile) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{module.title}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Fortschritt</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="topics">
            <AccordionTrigger>Themen</AccordionTrigger>
            <AccordionContent>
              {module.topics.map(topic => (
                <div key={topic.id} className="mb-4">
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="mt-1">{topic.content}</p>
                </div>
              ))}
              <Button 
                onClick={() => handleSectionComplete('topics')}
                className="w-full mt-4"
                disabled={completedSections.topics}
              >
                {completedSections.topics ? 'Themen abgeschlossen' : 'Themen abschließen'}
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="exercises">
            <AccordionTrigger>Übungen</AccordionTrigger>
            <AccordionContent>
              {module.exercises.map(exercise => (
                <div key={exercise.id} className="mb-4">
                  <h3 className="font-medium">{exercise.title}</h3>
                  <p className="mt-1 mb-2">{exercise.description}</p>
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="font-medium mb-1">Lösung:</h4>
                    <pre className="whitespace-pre-wrap text-sm">{exercise.solution}</pre>
                  </div>
                  <Button 
                    onClick={() => handleExerciseComplete(exercise.id, true)}
                    className="w-full mt-2"
                    disabled={completedSections.exercises}
                  >
                    {completedSections.exercises ? 'Übung abgeschlossen' : 'Übung abschließen'}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quiz">
            <AccordionTrigger>Quiz</AccordionTrigger>
            <AccordionContent>
              <h3 className="font-medium mb-2">{module.quiz.title}</h3>
              <div className="space-y-4">
                {module.quiz.questions.map((question, index) => (
                  <div key={question.id} className="space-y-2">
                    <h4 className="font-medium">{index + 1}. {question.question}</h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id={`${question.id}-${optionIndex}`} 
                            name={question.id} 
                            value={option}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`${question.id}-${optionIndex}`}>{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  onClick={() => handleQuizComplete(100)}
                  className="w-full mt-4"
                  disabled={completedSections.quiz}
                >
                  {completedSections.quiz ? 'Quiz abgeschlossen' : 'Quiz abschließen'}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flashcards">
            <AccordionTrigger>Karteikarten</AccordionTrigger>
            <AccordionContent>
              <h3 className="font-medium mb-2">{module.flashcards.title}</h3>
              <div className="space-y-3">
                {module.flashcards.cards.map(card => (
                  <div key={card.id} className="border rounded-md p-3">
                    <div className="font-medium mb-1">Vorderseite:</div>
                    <p className="mb-2">{card.front}</p>
                    <div className="font-medium mb-1">Rückseite:</div>
                    <p>{card.back}</p>
                  </div>
                ))}
                <Button 
                  onClick={handleFlashcardsComplete}
                  className="w-full mt-4"
                  disabled={completedSections.flashcards}
                >
                  {completedSections.flashcards ? 'Karteikarten abgeschlossen' : 'Karteikarten abschließen'}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // Desktop-Ansicht mit Tabs
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>{module.description}</CardDescription>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Fortschritt</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="topics">Themen</TabsTrigger>
          <TabsTrigger value="exercises">Übungen</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="flashcards">Karteikarten</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
} 