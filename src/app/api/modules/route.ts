import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { courseModules } from '@/app/courses/[courseId]/courseData';

export async function GET() {
  try {
    console.log('Starte API-Route für Module...');
    const { db } = await connectToDatabase();
    console.log('Datenbankverbindung hergestellt');
    
    // Hole Module aus der Datenbank
    console.log('Suche Module in der Datenbank...');
    const modules = await db.collection('modules').find({}).toArray();
    console.log(`Gefundene Module: ${modules.length}`);
    
    // Wenn keine Module in der Datenbank sind, verwende die Standard-Module
    if (modules.length === 0) {
      console.log('Keine Module gefunden, füge Standard-Module hinzu...');
      try {
        // Konvertiere die Module in das richtige Format
        const allModules = Object.values(courseModules).flat();
        console.log(`Konvertiere ${allModules.length} Module...`);
        
        // Füge Standard-Module zur Datenbank hinzu
        await db.collection('modules').insertMany(allModules);
        console.log('Standard-Module erfolgreich hinzugefügt');
        return NextResponse.json(allModules);
      } catch (insertError) {
        console.error('Fehler beim Hinzufügen der Standard-Module:', insertError);
        // Wenn das Hinzufügen fehlschlägt, gib trotzdem die Standard-Module zurück
        const allModules = Object.values(courseModules).flat();
        return NextResponse.json(allModules);
      }
    }
    
    console.log('Gebe Module zurück');
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Fehler beim Laden der Module:', error);
    
    // Im Fehlerfall geben wir die Standard-Module zurück
    console.log('Gebe Standard-Module als Fallback zurück');
    const allModules = Object.values(courseModules).flat();
    return NextResponse.json(allModules);
  }
} 