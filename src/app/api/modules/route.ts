import { NextRequest, NextResponse } from 'next/server';
import { courseModules } from '@/app/courses/[courseId]/modules';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting modules API route...');
    
    // Get courseId from the URL
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');
    
    console.log('Request URL:', request.url);
    console.log('Course ID from params:', courseId);

    if (!courseId) {
      console.error('No course ID provided');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // For now, return all modules regardless of courseId
    // This will be updated when we have course-specific modules
    console.log(`Returning ${courseModules.length} modules`);
    console.log('Modules:', JSON.stringify(courseModules, null, 2));
    
    return NextResponse.json(courseModules);
    
  } catch (error) {
    console.error('Error in modules API route:', error);
    return NextResponse.json(
      { error: 'Failed to load modules', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 