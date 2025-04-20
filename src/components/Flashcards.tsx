'use client';

import { useState } from 'react';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsProps {
  flashcards: Flashcard[];
}

export default function Flashcards({ flashcards }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleComplete = () => {
    setCompletedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  if (!flashcards.length) {
    return (
      <div className="text-center p-4">
        <p>Keine Karteikarten verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <div className="text-sm text-gray-600 mb-2">
          Karte {currentIndex + 1} von {flashcards.length}
        </div>
        
        <div
          className={`min-h-[200px] p-4 rounded-lg mb-4 cursor-pointer transition-all duration-300 ${
            showAnswer ? 'bg-blue-50' : 'bg-gray-50'
          }`}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div className="text-lg font-medium mb-4">
            {showAnswer ? 'Antwort:' : 'Frage:'}
          </div>
          <div className="text-gray-800">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            ← Vorherige
          </button>

          <button
            onClick={toggleComplete}
            className={`px-4 py-2 rounded transition-colors ${
              completedCards.has(currentIndex)
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {completedCards.has(currentIndex) ? 'Erledigt' : 'Als erledigt markieren'}
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Nächste →
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-600 mb-2">Fortschritt:</div>
        <div className="flex gap-2 flex-wrap">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                completedCards.has(index)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 