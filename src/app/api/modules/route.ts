import { NextRequest, NextResponse } from 'next/server';
import { moduleManager } from '@/lib/moduleManager';
import { Module } from '@/app/courses/[courseId]/modules';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting modules API route...');
    
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const forceRefresh = searchParams.get('forceRefresh') === 'true';
    
    console.log('Request URL:', request.url);
    console.log('Course ID from params:', courseId);
    console.log('Force refresh:', forceRefresh);

    if (!courseId) {
      console.error('No course ID provided');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Verwende den ModuleManager, um die Module zu laden
    const modules = await moduleManager.getModulesForCourse(courseId, forceRefresh);
    
    console.log(`Found ${modules.length} modules for course ${courseId}`);
    
    return NextResponse.json(modules);
    
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const module: Module = await request.json();
    
    // Validiere das Modul
    if (!module.id || !module.courseId || !module.title || !module.description || !module.duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Verwende den ModuleManager, um das Modul zu speichern
    const moduleId = await moduleManager.saveModule(module);
    
    return NextResponse.json(
      { message: 'Module created successfully', moduleId },
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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    
    if (!moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      );
    }
    
    const updates: Partial<Module> = await request.json();
    
    // Verwende den ModuleManager, um das Modul zu aktualisieren
    const updatedModule = await moduleManager.updateModule(moduleId, updates);
    
    if (!updatedModule) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error('Error updating module:', error);
    return NextResponse.json(
      { error: 'Failed to update module' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    
    if (!moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      );
    }
    
    // Verwende den ModuleManager, um das Modul zu löschen
    const success = await moduleManager.deleteModule(moduleId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Module deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting module:', error);
    return NextResponse.json(
      { error: 'Failed to delete module' },
      { status: 500 }
    );
  }
} 