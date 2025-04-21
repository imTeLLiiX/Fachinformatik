'use client';

import { Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Lazy load the PremiumPlan component
const PremiumPlan = lazy(() => import('@/components/shop/PremiumPlan'));

// Types
interface PremiumPlanType {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

export default function ShopPage() {
  const router = useRouter();

  const plans: PremiumPlanType[] = [
    {
      id: 'monthly',
      name: 'Monatlich',
      price: 9.99,
      duration: 30,
      features: [
        'Zugang zu allen Premium-Kursen',
        'Unbegrenzte Quiz-Teilnahmen',
        'Premium-Support',
        'Keine Werbung'
      ]
    },
    {
      id: 'quarterly',
      name: 'Vierteljährlich',
      price: 24.99,
      duration: 90,
      features: [
        'Zugang zu allen Premium-Kursen',
        'Unbegrenzte Quiz-Teilnahmen',
        'Premium-Support',
        'Keine Werbung',
        '15% Rabatt'
      ],
      popular: true
    },
    {
      id: 'yearly',
      name: 'Jährlich',
      price: 89.99,
      duration: 365,
      features: [
        'Zugang zu allen Premium-Kursen',
        'Unbegrenzte Quiz-Teilnahmen',
        'Premium-Support',
        'Keine Werbung',
        '30% Rabatt',
        'Exklusive Inhalte'
      ]
    }
  ];

  const handlePurchase = async (planId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planId }),
      });

      if (!response.ok) {
        throw new Error('Fehler bei der Erstellung der Checkout-Session');
      }

      const { sessionId } = await response.json();
      router.push(`/shop/payment?session_id=${sessionId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Mitgliedschaft
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Wähle den passenden Plan für deine Lernreise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Suspense fallback={<LoadingSpinner />}>
            {plans.map((plan) => (
              <PremiumPlan
                key={plan.id}
                plan={plan}
                onPurchase={handlePurchase}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
} 