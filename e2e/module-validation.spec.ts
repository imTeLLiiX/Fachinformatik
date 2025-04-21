import { test, expect } from '@playwright/test';

test.describe('Module Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/modules');
  });

  test('should validate a correct module structure', async ({ page }) => {
    const validModule = {
      id: 'test-module',
      title: 'Test Module',
      description: 'A test module',
      topics: [
        {
          id: 'topic-1',
          title: 'Topic 1',
          content: 'Content for topic 1'
        }
      ],
      exercises: [
        {
          id: 'exercise-1',
          title: 'Exercise 1',
          description: 'Description for exercise 1',
          solution: 'Solution for exercise 1'
        }
      ],
      quizzes: [
        {
          id: 'quiz-1',
          title: 'Quiz 1',
          questions: [
            {
              id: 'q1',
              text: 'Question 1',
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 'A'
            }
          ]
        }
      ],
      flashcards: [
        {
          id: 'flashcard-1',
          front: 'Front of card 1',
          back: 'Back of card 1'
        }
      ]
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, validModule);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(true);
  });

  test('should detect missing required fields', async ({ page }) => {
    const invalidModule = {
      title: 'Test Module',
      description: 'A test module'
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, invalidModule);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Module must have an id');
  });

  test('should validate topic structure', async ({ page }) => {
    const moduleWithInvalidTopic = {
      id: 'test-module',
      title: 'Test Module',
      description: 'A test module',
      topics: [
        {
          title: 'Topic 1' // Missing id
        }
      ]
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, moduleWithInvalidTopic);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Each topic must have an id');
  });

  test('should validate exercise structure', async ({ page }) => {
    const moduleWithInvalidExercise = {
      id: 'test-module',
      title: 'Test Module',
      description: 'A test module',
      exercises: [
        {
          id: 'exercise-1',
          title: 'Exercise 1' // Missing description and solution
        }
      ]
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, moduleWithInvalidExercise);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Each exercise must have a description and solution');
  });

  test('should validate quiz structure', async ({ page }) => {
    const moduleWithInvalidQuiz = {
      id: 'test-module',
      title: 'Test Module',
      description: 'A test module',
      quizzes: [
        {
          id: 'quiz-1',
          title: 'Quiz 1',
          questions: [
            {
              text: 'Question 1',
              options: ['A', 'B', 'C', 'D'] // Missing id and correctAnswer
            }
          ]
        }
      ]
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, moduleWithInvalidQuiz);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Each question must have an id and correct answer');
  });

  test('should validate flashcard structure', async ({ page }) => {
    const moduleWithInvalidFlashcard = {
      id: 'test-module',
      title: 'Test Module',
      description: 'A test module',
      flashcards: [
        {
          front: 'Front of card 1' // Missing id and back
        }
      ]
    };

    await page.evaluate((module) => {
      // @ts-ignore
      window.validateModule(module);
    }, moduleWithInvalidFlashcard);

    const validationResult = await page.evaluate(() => {
      // @ts-ignore
      return window.lastValidationResult;
    });

    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain('Each flashcard must have an id, front, and back');
  });
}); 