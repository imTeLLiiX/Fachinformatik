'use client';

import React, { useState, useEffect } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  timeLimit?: number;
  onComplete?: (score: number) => void;
}

export default function Quiz({ questions, timeLimit = 300, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleQuizComplete();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        handleQuizComplete();
      }
    }, 1500);
  };

  const handleQuizComplete = () => {
    const finalScore = (score / questions.length) * 100;
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz abgeschlossen!</h2>
        <p className="text-xl">Deine Punktzahl: {((score / questions.length) * 100).toFixed(1)}%</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Frage {currentQuestion + 1} von {questions.length}
        </div>
        <div className="text-sm font-medium">
          Zeit übrig: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${
                isAnswered
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Punktzahl: {score} von {questions.length}
      </div>
    </div>
  );
} 