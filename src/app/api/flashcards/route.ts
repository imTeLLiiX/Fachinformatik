import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const { db } = await connectToDatabase();

    const query = category ? { category } : {};
    const flashcards = await db.collection('flashcards').find(query).toArray();

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { question, answer, category, difficulty, isPublic } = await request.json();
    const { db } = await connectToDatabase();

    const flashcard = {
      question,
      answer,
      category,
      difficulty,
      isPublic,
      createdBy: session.user.id,
      createdAt: new Date(),
    };

    const result = await db.collection('flashcards').insertOne(flashcard);
    return NextResponse.json({ id: result.insertedId, ...flashcard });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 