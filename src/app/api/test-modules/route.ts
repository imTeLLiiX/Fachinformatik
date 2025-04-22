import { NextResponse } from 'next/server';
import { courseModules } from '@/app/courses/[courseId]/modules';

export async function GET() {
  try {
    return NextResponse.json({ 
      status: 'ok',
      moduleCount: courseModules.length,
      modules: courseModules.map(module => ({
        id: module.id,
        title: module.title,
        topicCount: module.topics.length,
        exerciseCount: module.exercises.length,
        hasQuiz: !!module.quiz,
        hasFlashcards: !!module.flashcards,
        duration: module.duration
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Modules test failed:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 