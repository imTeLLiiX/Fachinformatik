import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { courseModules } from '@/app/courses/[courseId]/courseData';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting modules API route...');
    
    // Get courseId from the URL
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');
    
    console.log('Request URL:', request.url);
    console.log('Course ID from params:', courseId);
    console.log('Available course modules:', Object.keys(courseModules));

    if (!courseId) {
      console.error('No course ID provided');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Get modules for the specific course
    const modules = courseModules[courseId];

    if (!modules) {
      console.error(`No modules found for course ID: ${courseId}`);
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    console.log(`Found ${modules.length} modules for course ${courseId}`);
    console.log('Modules:', JSON.stringify(modules, null, 2));
    
    return NextResponse.json(modules);
    
  } catch (error) {
    console.error('Error in modules API route:', error);
    return NextResponse.json(
      { error: 'Failed to load modules', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 