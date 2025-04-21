import { ObjectId } from 'mongodb';

export interface Topic {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'theory' | 'exercise' | 'quiz' | 'flashcard';
  completed?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  code: string;
  solution: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed?: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  completed?: boolean;
  score?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Module {
  _id: ObjectId;
  slug: string;
  title: string;
  description: string;
  image?: string;
  status: 'draft' | 'published';
  order: number;
  topics: Topic[];
  exercises: Exercise[];
  quizzes: Quiz[];
  flashcards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: ObjectId;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites?: string[]; // module slugs
}

export interface ModuleInput {
  slug: string;
  title: string;
  description: string;
  image?: string;
  status?: Module['status'];
  order?: number;
  topics?: Topic[];
  exercises?: Exercise[];
  quizzes?: Quiz[];
  flashcards?: Flashcard[];
  author: ObjectId;
  tags?: string[];
  difficulty?: Module['difficulty'];
  estimatedTime?: number;
  prerequisites?: string[];
}

export interface ModuleUpdate {
  title?: string;
  description?: string;
  image?: string;
  status?: Module['status'];
  order?: number;
  topics?: Topic[];
  exercises?: Exercise[];
  quizzes?: Quiz[];
  flashcards?: Flashcard[];
  tags?: string[];
  difficulty?: Module['difficulty'];
  estimatedTime?: number;
  prerequisites?: string[];
  publishedAt?: Date;
} 