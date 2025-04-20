import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Starting test endpoint');
    const { db } = await connectToDatabase();
    
    // Test database connection
    const result = await db.command({ ping: 1 });
    console.log('Ping result:', result);
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      ping: result
    });
  } catch (error: unknown) {
    console.error('Test endpoint error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 'error',
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Unknown error occurred'
        },
        { status: 500 }
      );
    }
  }
} 