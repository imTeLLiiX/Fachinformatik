import { describe, it, expect } from 'vitest';
import { ModuleCache } from '@/lib/redis';
import { Module } from '@/types/module';

describe('Grid Recovery Tests', () => {
  const mockModule: Module = {
    id: 'test-module-1',
    title: 'Test Modul',
    description: 'Ein Test Modul',
    topics: [
      {
        id: 'topic-1',
        title: 'Test Topic',
        content: 'Test Content',
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Test Exercise',
        description: 'Test Description',
        solution: 'Test Solution',
      },
    ],
    quizzes: [
      {
        id: 'quiz-1',
        title: 'Test Quiz',
        questions: [
          {
            id: 'question-1',
            text: 'Test Question',
            options: ['Option 1', 'Option 2'],
            correctOption: 0,
          },
        ],
      },
    ],
    flashcards: [
      {
        id: 'flashcard-1',
        question: 'Test Question',
        answer: 'Test Answer',
      },
    ],
  };

  it('sollte ein Modul erfolgreich im Cache speichern', async () => {
    await ModuleCache.setModule(mockModule.id, mockModule);
    const cached = await ModuleCache.getModule(mockModule.id);
    expect(cached).toEqual(mockModule);
  });

  it('sollte ein Modul erfolgreich aus dem Cache abrufen', async () => {
    const cached = await ModuleCache.getModule(mockModule.id);
    expect(cached).toBeDefined();
    expect(cached?.id).toBe(mockModule.id);
  });

  it('sollte ein Modul erfolgreich aus dem Cache invalidieren', async () => {
    await ModuleCache.invalidateModule(mockModule.id);
    const cached = await ModuleCache.getModule(mockModule.id);
    expect(cached).toBeNull();
  });

  it('sollte mehrere Module für einen Kurs im Cache speichern', async () => {
    const modules = [mockModule, { ...mockModule, id: 'test-module-2' }];
    await ModuleCache.setModulesForCourse('test-course', modules);
    const cached = await ModuleCache.getModulesForCourse('test-course');
    expect(cached).toEqual(modules);
  });

  it('sollte mehrere Module für einen Kurs aus dem Cache abrufen', async () => {
    const cached = await ModuleCache.getModulesForCourse('test-course');
    expect(cached).toBeDefined();
    expect(cached?.length).toBe(2);
  });

  it('sollte mehrere Module für einen Kurs aus dem Cache invalidieren', async () => {
    await ModuleCache.invalidateCourseModules('test-course');
    const cached = await ModuleCache.getModulesForCourse('test-course');
    expect(cached).toBeNull();
  });
}); 