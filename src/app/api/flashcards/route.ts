import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      where: {
        flashcards: {
          not: null
        }
      },
      select: {
        id: true,
        title: true,
        flashcards: true
      }
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 