import { NextResponse } from 'next/server';
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

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Moduls' },
      { status: 500 }
    );
  }
} 