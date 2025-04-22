'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  timeLimit?: number;
  onComplete?: (score: number) => void;
}

export default function Quiz({ questions, timeLimit, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(timeLimit || 0);

  React.useEffect(() => {
    if (timeLimit) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            if (onComplete) {
              onComplete(score / questions.length);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit, score, questions.length, onComplete]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else if (onComplete) {
      onComplete(score / questions.length);
    }
  };

  const question = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frage {currentQuestion + 1} von {questions.length}</CardTitle>
        {timeLimit && (
          <div className="text-sm text-gray-500">
            Zeit übrig: {timeLeft} Sekunden
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
              >
                {option}
              </Button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold mb-2">Erklärung:</p>
              <p>{question.explanation}</p>
            </div>
          )}
          {showExplanation && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 