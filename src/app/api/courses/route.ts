import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Course } from '@/types/course';

export async function GET() {
  try {
    console.log('Starting GET /api/courses request');
    
    const courses = await prisma.course.findMany();
    console.log(`Found ${courses.length} courses`);

    return NextResponse.json(courses);
  } catch (error: unknown) {
    console.error('Error in GET /api/courses:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Fehler beim Abrufen der Kurse: ' + error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Fehler beim Abrufen der Kurse: Unbekannter Fehler' },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const courseData: Course = await request.json();
    
    // Add timestamps
    const course = await prisma.course.create({
      data: {
        ...courseData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json(
      { message: 'Course created successfully', courseId: course.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
} 