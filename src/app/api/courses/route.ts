import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Course } from '@/types/course';

export async function GET() {
  try {
    console.log('Starting GET /api/courses request');
    const { db } = await connectToDatabase();
    console.log('Successfully connected to database');

    const courses = await db.collection('courses').find({}).toArray();
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
    const { db } = await connectToDatabase();
    const course: Course = await request.json();
    
    // Add timestamps
    course.createdAt = new Date();
    course.updatedAt = new Date();
    
    const result = await db.collection<Course>('courses').insertOne(course);
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert course');
    }
    
    return NextResponse.json(
      { message: 'Course created successfully', courseId: result.insertedId },
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