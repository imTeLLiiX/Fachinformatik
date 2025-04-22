export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  topics: {
    id: string;
    title: string;
    content: string;
  }[];
  exercises: {
    id: string;
    title: string;
    description: string;
    solution: string;
  }[];
  quiz: {
    id: string;
    title: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  flashcards: {
    id: string;
    title: string;
    cards: {
      id: string;
      front: string;
      back: string;
    }[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const courseModules: Module[] = []; 