import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Course } from '@/types/course';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const courses = await db.collection<Course>('courses').find({}).toArray();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
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