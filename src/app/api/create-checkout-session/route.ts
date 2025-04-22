import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PaymentService } from '@/lib/stripe';
import { SubscriptionTier } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { tier } = await request.json();

    if (!tier) {
      return NextResponse.json(
        { error: 'Kein Plan ausgewählt' },
        { status: 400 }
      );
    }

    const paymentService = new PaymentService();
    const checkoutSession = await paymentService.createCheckoutSession({
      customerId: session.user.id,
      tier: tier as SubscriptionTier,
      successUrl: `${process.env.NEXTAUTH_URL}/payment/success`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/payment/cancel`,
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen der Checkout-Session' },
      { status: 500 }
    );
  }
} 