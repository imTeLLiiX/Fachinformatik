import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  interval?: 'month' | 'year';
  oneTime?: boolean;
};

export const PAYMENT_PLANS: Record<string, SubscriptionPlan> = {
  monthly: {
    id: 'price_monthly',
    name: 'Monatlich Premium',
    price: 999,
    interval: 'month',
  },
  yearly: {
    id: 'price_yearly',
    name: 'Jährlich Premium',
    price: 9999,
    interval: 'year',
  },
  lifetime: {
    id: 'price_lifetime',
    name: 'Lifetime Premium',
    price: 29999,
    oneTime: true,
  },
};

export class PaymentService {
  async createCheckoutSession({
    customerId,
    priceId,
    successUrl,
    cancelUrl,
  }: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    return stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  async createCustomer(email: string) {
    return stripe.customers.create({
      email,
    });
  }

  async handleSubscription(plan: keyof typeof PAYMENT_PLANS) {
    const selectedPlan = PAYMENT_PLANS[plan];
    
    if (selectedPlan.oneTime) {
      return stripe.prices.create({
        product_data: {
          name: selectedPlan.name,
        },
        unit_amount: selectedPlan.price,
        currency: 'eur',
      });
    }

    return stripe.prices.create({
      product_data: {
        name: selectedPlan.name,
      },
      unit_amount: selectedPlan.price,
      currency: 'eur',
      recurring: {
        interval: selectedPlan.interval!,
      },
    });
  }

  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.cancel(subscriptionId);
  }

  async getSubscription(subscriptionId: string) {
    return stripe.subscriptions.retrieve(subscriptionId);
  }
}

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 9.99,
    features: [
      'Zugriff auf alle Grundmodule',
      'Fortschrittsverfolgung',
      'Zertifikate',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 19.99,
    features: [
      'Alle Basic-Features',
      'Premium-Module',
      '1:1 Support',
      'Offline-Zugriff',
    ],
  },
  LIFETIME: {
    name: 'Lifetime',
    price: 299.99,
    features: [
      'Alle Pro-Features',
      'Lebenslanger Zugriff',
      'Zukünftige Module inklusive',
      'VIP Support',
    ],
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_PLANS;

export async function createCheckoutSession(
  tier: SubscriptionTier,
  userId: string,
  successUrl: string,
  cancelUrl: string
) {
  const plan = SUBSCRIPTION_PLANS[tier];
  
  const session = await stripe.checkout.sessions.create({
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
          recurring: tier !== 'LIFETIME' ? {
            interval: 'month',
          } : undefined,
        },
        quantity: 1,
      },
    ],
    mode: tier === 'LIFETIME' ? 'payment' : 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      tier,
    },
  });

  return session;
}

export async function createPortalSession(userId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: userId,
    return_url: returnUrl,
  });

  return session;
}

export async function createCustomer(email: string, name: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
} 