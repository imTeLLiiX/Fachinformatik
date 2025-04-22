import { validateModule } from '../validateModule';
import { Module } from '@/types/module';

describe('validateModule', () => {
  const validModule: Module = {
    id: 'test-module',
    title: 'Test Module',
    description: 'A test module',
    topics: [
      {
        id: 'topic-1',
        title: 'Topic 1',
        content: 'Content for topic 1',
        order: 1
      }
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Exercise 1',
        description: 'Description for exercise 1',
        difficulty: 'beginner',
        points: 10
      }
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'Quiz 1',
        questions: [
          {
            id: 'q1',
            question: 'Test question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'flashcard-1',
        front: 'Front of card',
        back: 'Back of card'
      }
    ]
  };

  it('should validate a correct module successfully', () => {
    const result = validateModule(validModule);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect missing required fields', () => {
    const invalidModule = { ...validModule };
    delete invalidModule.id;
    
    const result = validateModule(invalidModule as Module);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Module must have an id');
  });

  it('should validate topics structure', () => {
    const invalidModule = { ...validModule };
    invalidModule.topics[0].id = '';
    
    const result = validateModule(invalidModule);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Topic must have an id');
  });

  it('should validate exercises structure', () => {
    const invalidModule = { ...validModule };
    invalidModule.exercises[0].solution = '';
    
    const result = validateModule(invalidModule);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Exercise must have an id');
  });

  it('should validate quizzes structure', () => {
    const invalidModule = { ...validModule };
    invalidModule.quizzes[0].questions[0].options = [];
    
    const result = validateModule(invalidModule);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Quiz must have an id');
  });

  it('should validate flashcards structure', () => {
    const invalidModule = { ...validModule };
    invalidModule.flashcards[0].front = '';
    
    const result = validateModule(invalidModule);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Flashcard must have an id');
  });
}); 