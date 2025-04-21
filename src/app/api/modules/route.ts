import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCachedModules, setCachedModules, invalidateAllModulesCache } from '@/lib/redis';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Try to get modules from cache
    const cachedModules = await getCachedModules();
    if (cachedModules) {
      return NextResponse.json(cachedModules);
    }

    // If not in cache, fetch from database
    const modules = await prisma.module.findMany({
      include: {
        lessons: true,
        quizzes: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Cache the modules
    await setCachedModules(modules);

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const module = await prisma.module.create({
      data: {
        title: data.title,
        description: data.description,
        order: data.order,
        lessons: {
          create: data.lessons || [],
        },
        quizzes: {
          create: data.quizzes || [],
        },
      },
      include: {
        lessons: true,
        quizzes: true,
      },
    });

    // Invalidate the modules cache
    await invalidateAllModulesCache();

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 