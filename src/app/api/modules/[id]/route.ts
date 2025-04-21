import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const moduleData = await prisma.module.findUnique({
      where: { id: params.id },
      include: {
        course: true
      }
    });

    if (!moduleData) {
      return NextResponse.json(
        { error: 'Modul nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(moduleData);
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
    const moduleData = await request.json();
    const updatedModule = await prisma.module.update({
      where: { id: params.id },
      data: moduleData,
    });

    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error('Error updating module:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    await prisma.module.delete({
      where: { id: id }
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