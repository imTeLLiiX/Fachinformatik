import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Module } from '@/app/courses/[courseId]/modules';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting modules API route...');
    
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    console.log('Request URL:', request.url);
    console.log('Course ID from params:', courseId);

    if (!courseId) {
      console.error('No course ID provided');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const modules = await db.collection('modules')
      .find({ courseId })
      .toArray();
    
    console.log(`Found ${modules.length} modules for course ${courseId}`);
    
    return NextResponse.json(modules);
    
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const module: Module = await request.json();
    
    // Add timestamps
    module.createdAt = new Date();
    module.updatedAt = new Date();
    
    const result = await db.collection<Module>('modules').insertOne(module);
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert module');
    }
    
    return NextResponse.json(
      { message: 'Module created successfully', moduleId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Failed to create module' },
      { status: 500 }
    );
  }
} 