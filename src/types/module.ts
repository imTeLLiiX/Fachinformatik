export interface Topic {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  content: string;
  solution: string;
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  order: number;
}

export interface FlashcardCard {
  id: string;
  front: string;
  back: string;
}

export interface Flashcard {
  id: string;
  title: string;
  cards: FlashcardCard[];
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
  exercises: Exercise[];
  quizzes: Quiz[];
  flashcards: Flashcard[];
} 