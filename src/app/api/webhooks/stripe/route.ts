import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse('Missing stripe signature or webhook secret', { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const { db } = await connectToDatabase();

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await db.collection('users').updateOne(
          { stripeCustomerId: subscription.customer },
          {
            $set: {
              subscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              subscriptionPlan: subscription.items.data[0].price.id,
              updatedAt: new Date(),
            },
          }
        );
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await db.collection('users').updateOne(
          { stripeCustomerId: deletedSubscription.customer },
          {
            $set: {
              subscriptionId: null,
              subscriptionStatus: 'canceled',
              subscriptionPlan: null,
              updatedAt: new Date(),
            },
          }
        );
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook error', { status: 400 });
  }
} 