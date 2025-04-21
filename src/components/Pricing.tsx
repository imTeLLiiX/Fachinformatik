'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';

const PLANS = [
  {
    name: 'Monthly',
    price: '9.99',
    features: [
      'Unlimited access to all courses',
      'Practice exercises',
      'Course certificates',
      'Community access'
    ],
    id: 'price_monthly'
  },
  {
    name: 'Yearly',
    price: '99.99',
    features: [
      'All Monthly features',
      '2 months free',
      'Priority support',
      'Early access to new courses'
    ],
    id: 'price_yearly'
  },
  {
    name: 'Lifetime',
    price: '299.99',
    features: [
      'All Yearly features',
      'One-time payment',
      'Exclusive workshops',
      'Personal mentoring sessions'
    ],
    id: 'price_lifetime'
  }
];

export function Pricing() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to subscribe',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(priceId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: priceId,
        }),
      });

      const { sessionId } = await response.json();
      window.location.href = sessionId;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Get unlimited access to all our courses and features
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.id} className="p-8">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-gray-500">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.name !== 'Lifetime' && ' / ' + plan.name.toLowerCase()}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="mt-8 w-full"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? 'Processing...' : 'Subscribe'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 