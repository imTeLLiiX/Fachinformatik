'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
  onComplete?: () => void;
}

export default function Flashcards({ cards, onComplete }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [completedCards, setCompletedCards] = React.useState<number[]>([]);

  const handleNext = () => {
    if (!completedCards.includes(currentCard)) {
      setCompletedCards([...completedCards, currentCard]);
    }
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  const card = cards[currentCard];
  const progress = (completedCards.length / cards.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Karte {currentCard + 1} von {cards.length}
        </div>
        <div className="text-sm text-gray-500">
          {completedCards.length} von {cards.length} Karten gelernt
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">{card.question}</p>
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} className="w-full">
                Antwort anzeigen
              </Button>
            ) : (
              <>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold mb-2">Antwort:</p>
                  <p>{card.answer}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentCard === 0}
                    className="flex-1"
                  >
                    Zurück
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    {currentCard < cards.length - 1 ? 'Nächste Karte' : 'Fertig'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 