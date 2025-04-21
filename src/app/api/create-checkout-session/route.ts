import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PaymentService } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const { plan } = await request.json();

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan ist erforderlich' },
        { status: 400 }
      );
    }

    const paymentService = new PaymentService();
    const checkoutSession = await paymentService.createCheckoutSession({
      customerId: session.user.id,
      priceId: plan,
      successUrl: `${process.env.NEXTAUTH_URL}/payment/success`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/payment/cancel`,
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Fehler bei der Erstellung der Checkout-Session:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 