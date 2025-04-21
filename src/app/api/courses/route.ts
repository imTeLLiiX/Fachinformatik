import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        modules: true
      }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Kurse' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }

    const courseData = await request.json();

    // Validate required fields
    if (!courseData.title || !courseData.description) {
      return NextResponse.json(
        { error: 'Titel und Beschreibung sind erforderlich' },
        { status: 400 }
      );
    }

    // Add timestamps
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        imageUrl: courseData.imageUrl,
        price: courseData.price,
        isPublished: courseData.isPublished || false,
        author: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Kurses' },
      { status: 500 }
    );
  }
} 