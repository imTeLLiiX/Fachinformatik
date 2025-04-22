import { Module, Topic, Exercise, Quiz, QuizQuestion, Flashcard, FlashcardCard } from '@/types/module';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateModule(module: Module): ValidationResult {
  const errors: string[] = [];

  // Validate module structure
  if (!module.id) errors.push('Module must have an id');
  if (!module.title) errors.push('Module must have a title');
  if (!module.description) errors.push('Module must have a description');
  if (typeof module.order !== 'number') errors.push('Module must have an order number');

  // Validate topics
  if (Array.isArray(module.topics)) {
    module.topics.forEach((topic: Topic, index: number) => {
      if (!topic.id) errors.push(`Topic at index ${index} must have an id`);
      if (!topic.title) errors.push(`Topic at index ${index} must have a title`);
      if (!topic.content) errors.push(`Topic at index ${index} must have content`);
      if (typeof topic.order !== 'number') errors.push(`Topic at index ${index} must have an order number`);
    });
  }

  // Validate exercises
  if (Array.isArray(module.exercises)) {
    module.exercises.forEach((exercise: Exercise, index: number) => {
      if (!exercise.id) errors.push(`Exercise at index ${index} must have an id`);
      if (!exercise.title) errors.push(`Exercise at index ${index} must have a title`);
      if (!exercise.description) errors.push(`Exercise at index ${index} must have a description`);
      if (!exercise.content) errors.push(`Exercise at index ${index} must have content`);
      if (!exercise.solution) errors.push(`Exercise at index ${index} must have a solution`);
      if (typeof exercise.order !== 'number') errors.push(`Exercise at index ${index} must have an order number`);
    });
  }

  // Validate quizzes
  if (Array.isArray(module.quizzes)) {
    module.quizzes.forEach((quiz: Quiz, index: number) => {
      if (!quiz.id) errors.push(`Quiz at index ${index} must have an id`);
      if (!quiz.title) errors.push(`Quiz at index ${index} must have a title`);
      if (typeof quiz.order !== 'number') errors.push(`Quiz at index ${index} must have an order number`);

      if (Array.isArray(quiz.questions)) {
        quiz.questions.forEach((question: QuizQuestion, qIndex: number) => {
          if (!question.id) errors.push(`Question at index ${qIndex} in quiz ${index} must have an id`);
          if (!question.question) errors.push(`Question at index ${qIndex} in quiz ${index} must have a question`);
          if (!Array.isArray(question.options) || question.options.length < 2) {
            errors.push(`Question at index ${qIndex} in quiz ${index} must have at least 2 options`);
          }
          if (!question.correctAnswer) errors.push(`Question at index ${qIndex} in quiz ${index} must have a correct answer`);
          if (!question.explanation) errors.push(`Question at index ${qIndex} in quiz ${index} must have an explanation`);
        });
      }
    });
  }

  // Validate flashcards
  if (Array.isArray(module.flashcards)) {
    module.flashcards.forEach((flashcard: Flashcard, index: number) => {
      if (!flashcard.id) errors.push(`Flashcard at index ${index} must have an id`);
      if (!flashcard.title) errors.push(`Flashcard at index ${index} must have a title`);
      if (typeof flashcard.order !== 'number') errors.push(`Flashcard at index ${index} must have an order number`);

      if (Array.isArray(flashcard.cards)) {
        flashcard.cards.forEach((card: FlashcardCard, cIndex: number) => {
          if (!card.id) errors.push(`Card at index ${cIndex} in flashcard ${index} must have an id`);
          if (!card.front) errors.push(`Card at index ${cIndex} in flashcard ${index} must have a front side`);
          if (!card.back) errors.push(`Card at index ${cIndex} in flashcard ${index} must have a back side`);
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
} 