import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({ 
      status: 'ok',
      authenticated: !!session,
      session: session ? {
        user: {
          name: session.user?.name,
          email: session.user?.email,
          role: session.user?.role,
          isPremium: session.user?.isPremium
        }
      } : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Auth test failed:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 