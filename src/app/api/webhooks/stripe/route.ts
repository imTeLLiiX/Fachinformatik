import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { SubscriptionStatus, SubscriptionTier } from '@prisma/client';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature provided');
      return new NextResponse('No signature provided', { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new NextResponse('Webhook signature verification failed', { status: 400 });
    }

    console.log(`Processing Stripe webhook event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            
            if (!session.metadata?.userId) {
              console.error('No userId in session metadata');
              throw new Error('No userId in session metadata');
            }

            const tier = (session.metadata.tier as SubscriptionTier) || 'BASIC';
            const status = subscription.status === 'active' ? 'ACTIVE' : 'CANCELED';

            await prisma.user.update({
              where: { id: session.metadata.userId },
              data: {
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: status,
                subscriptionTier: tier,
              },
            });

            console.log(`Updated user ${session.metadata.userId} with subscription ${subscription.id}`);
          } catch (error) {
            console.error('Error processing checkout.session.completed:', error);
            throw error;
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        try {
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (!user) {
            console.error(`No user found for customer ${customerId}`);
            throw new Error(`No user found for customer ${customerId}`);
          }

          const status = subscription.status === 'active' ? 'ACTIVE' : 'CANCELED';
          const tier = (subscription.metadata.tier as SubscriptionTier) || 'BASIC';

          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: status,
              subscriptionTier: tier,
            },
          });

          console.log(`Updated subscription status for user ${user.id} to ${status}`);
        } catch (error) {
          console.error('Error processing customer.subscription.updated:', error);
          throw error;
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        try {
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (!user) {
            console.error(`No user found for customer ${customerId}`);
            throw new Error(`No user found for customer ${customerId}`);
          }

          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'CANCELED',
              stripeSubscriptionId: null,
            },
          });

          console.log(`Canceled subscription for user ${user.id}`);
        } catch (error) {
          console.error('Error processing customer.subscription.deleted:', error);
          throw error;
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
} 