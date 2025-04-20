import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Test the connection
    await db.command({ ping: 1 });
    
    // Count users
    const userCount = await db.collection('users').countDocuments();
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Database connection successful',
      userCount,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString() 
    }, { status: 500 });
  }
} 