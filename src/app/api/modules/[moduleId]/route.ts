import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: {
    moduleId: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { moduleId } = params;

    const module = await prisma.module.findUnique({
      where: { id: moduleId }
    });

    if (!module) {
      return NextResponse.json(
        { error: 'Modul nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen des Moduls' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { moduleId } = params;
    const updateData = await request.json();
    const { title, description, content, order } = updateData;

    if (!title || !description || !content || order === undefined) {
      return NextResponse.json(
        { error: 'Alle Pflichtfelder müssen ausgefüllt sein' },
        { status: 400 }
      );
    }

    const module = await prisma.module.update({
      where: { id: moduleId },
      data: {
        title,
        description,
        content,
        order,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error updating module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Moduls' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { moduleId } = params;

    await prisma.module.delete({
      where: { id: moduleId }
    });

    return NextResponse.json(
      { message: 'Modul erfolgreich gelöscht' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting module:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Moduls' },
      { status: 500 }
    );
  }
} 