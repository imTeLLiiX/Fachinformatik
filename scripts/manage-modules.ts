import { Module } from '../src/app/courses/[courseId]/modules';

interface ModuleInput {
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
}

function validateModule(module: ModuleInput): boolean {
  // Check required fields
  if (!module.id || !module.courseId || !module.title || !module.description || !module.duration) {
    console.error('Missing required fields in module');
    return false;
  }

  // Validate topics
  if (!Array.isArray(module.topics) || module.topics.length === 0) {
    console.error('Module must have at least one topic');
    return false;
  }

  for (const topic of module.topics) {
    if (!topic.id || !topic.title || !topic.content) {
      console.error('Invalid topic structure');
      return false;
    }
  }

  // Validate exercises
  if (Array.isArray(module.exercises)) {
    for (const exercise of module.exercises) {
      if (!exercise.id || !exercise.title || !exercise.description || !exercise.solution) {
        console.error('Invalid exercise structure');
        return false;
      }
    }
  }

  // Validate quiz
  if (!module.quiz || !module.quiz.id || !module.quiz.title || !Array.isArray(module.quiz.questions) || module.quiz.questions.length === 0) {
    console.error('Invalid quiz structure');
    return false;
  }

  for (const question of module.quiz.questions) {
    if (!question.id || !question.question || !Array.isArray(question.options) || !question.correctAnswer) {
      console.error('Invalid quiz question structure');
      return false;
    }
  }

  // Validate flashcards
  if (!module.flashcards || !module.flashcards.id || !module.flashcards.title || !Array.isArray(module.flashcards.cards) || module.flashcards.cards.length === 0) {
    console.error('Invalid flashcards structure');
    return false;
  }

  for (const card of module.flashcards.cards) {
    if (!card.id || !card.front || !card.back) {
      console.error('Invalid flashcard structure');
      return false;
    }
  }

  return true;
}

function createModule(input: ModuleInput): Module | null {
  if (!validateModule(input)) {
    return null;
  }

  return {
    ...input,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Example usage
const exampleModule: ModuleInput = {
  id: 'html-css-1',
  courseId: 'html-css',
  title: 'HTML & CSS Grundkurs - Einführung',
  description: 'Lernen Sie die Grundlagen von HTML und CSS kennen',
  duration: '2 Stunden',
  topics: [
    {
      id: 'intro',
      title: 'Einführung in HTML & CSS',
      content: 'Grundlegende Konzepte und Geschichte von HTML und CSS'
    }
  ],
  exercises: [
    {
      id: 'first-page',
      title: 'Erste HTML-Seite',
      description: 'Erstellen Sie Ihre erste HTML-Seite mit grundlegenden Elementen',
      solution: '<!DOCTYPE html>\n<html>\n<head>\n<title>Meine erste Seite</title>\n</head>\n<body>\n<h1>Willkommen</h1>\n</body>\n</html>'
    }
  ],
  quiz: {
    id: 'basics',
    title: 'HTML Grundlagen',
    questions: [
      {
        id: 'q1',
        question: 'Was bedeutet HTML?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctAnswer: 'Hyper Text Markup Language'
      }
    ]
  },
  flashcards: {
    id: 'f1',
    title: 'HTML Grundlagen',
    cards: [
      {
        id: 'c1',
        front: 'Was ist HTML?',
        back: 'HTML ist eine Auszeichnungssprache zur Strukturierung von Webseiten'
      }
    ]
  }
};

// Test the module creation
const module = createModule(exampleModule);
if (module) {
  console.log('Module created successfully:', module);
} else {
  console.error('Failed to create module');
} 