import Stripe from 'stripe';
import { SubscriptionTier } from '@prisma/client';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, {
  name: string;
  price: number;
  features: string[];
}> = {
  BASIC: {
    name: 'Basic',
    price: 9.99,
    features: [
      'Zugriff auf alle Grundmodule',
      'Fortschrittsverfolgung',
      'Zertifikate',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    price: 299.99,
    features: [
      'Alle Basic-Features',
      'Premium-Module',
      '1:1 Support',
      'Offline-Zugriff',
      'Lebenslanger Zugriff',
      'Zukünftige Module inklusive',
      'VIP Support',
    ],
  },
};

export class PaymentService {
  async createCheckoutSession({
    customerId,
    tier,
    successUrl,
    cancelUrl,
  }: {
    customerId: string;
    tier: SubscriptionTier;
    successUrl: string;
    cancelUrl: string;
  }) {
    const plan = SUBSCRIPTION_PLANS[tier];
    
    return stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${plan.name} Plan`,
              description: plan.features.join('\n'),
            },
            unit_amount: Math.round(plan.price * 100), // Stripe erwartet Cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        tier,
      },
    });
  }

  async createCustomer(email: string, name: string) {
    return stripe.customers.create({
      email,
      name,
    });
  }

  async getSubscription(subscriptionId: string) {
    return stripe.subscriptions.retrieve(subscriptionId);
  }

  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.cancel(subscriptionId);
  }

  async createPortalSession(customerId: string, returnUrl: string) {
    return stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }
} 