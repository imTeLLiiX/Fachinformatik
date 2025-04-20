import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { courseModules } from '@/app/courses/[courseId]/modules';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Hole Module aus der Datenbank
    const modules = await db.collection('modules').find({}).toArray();
    
    // Wenn keine Module in der Datenbank sind, verwende die Standard-Module
    if (modules.length === 0) {
      // Füge Standard-Module zur Datenbank hinzu
      await db.collection('modules').insertMany(courseModules);
      return NextResponse.json(courseModules);
    }
    
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Fehler beim Laden der Module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Module' },
      { status: 500 }
    );
  }
} 