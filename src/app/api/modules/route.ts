import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { courseModules } from '@/app/courses/[courseId]/courseData';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting modules API route...');
    
    // Get courseId from the URL
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');
    
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    console.log('Requested course ID:', courseId);

    // Get modules for the specific course
    const modules = courseModules[courseId];

    if (!modules) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    console.log(`Found ${modules.length} modules for course ${courseId}`);
    return NextResponse.json(modules);
    
  } catch (error) {
    console.error('Error loading modules:', error);
    return NextResponse.json(
      { error: 'Failed to load modules' },
      { status: 500 }
    );
  }
} 