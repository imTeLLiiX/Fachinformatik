import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        stripeSubscriptionId: {
          not: null
        }
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        stripeSubscriptionId: true,
        subscriptionStatus: true,
        subscriptionTier: true,
      }
    });

    const transactions = users.map(user => ({
      id: user.id,
      user: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      email: user.email,
      status: user.subscriptionStatus || 'INACTIVE',
      tier: user.subscriptionTier,
    }));

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 