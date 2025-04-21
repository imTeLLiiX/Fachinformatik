import { NextRequest, NextResponse } from 'next/server';
import { moduleManager } from '@/lib/moduleManager';
import { Module } from '@/types/module';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId ist erforderlich' },
        { status: 400 }
      );
    }

    const modules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error in GET /api/modules:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Module' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const moduleData = await request.json();
    const { courseId, title, description, content, order } = moduleData;

    if (!courseId || !title || !description || !content || order === undefined) {
      return NextResponse.json(
        { error: 'Alle Pflichtfelder müssen ausgefüllt sein' },
        { status: 400 }
      );
    }

    // Überprüfen, ob der Kurs existiert
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Der angegebene Kurs existiert nicht' },
        { status: 404 }
      );
    }

    const module = await prisma.module.create({
      data: {
        title,
        description,
        content,
        order,
        courseId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(
      { message: 'Modul erfolgreich erstellt', moduleId: module.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Moduls' },
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