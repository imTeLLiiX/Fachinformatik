'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
}

export default function ShopPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: PremiumPlan[] = [
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

    // Hier später Integration mit Zahlungsanbieter
    alert(`Premium-Plan ${planId} ausgewählt. Zahlungsintegration folgt.`);
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
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2">
                  Beliebteste Wahl
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h2>
                <div className="mb-6">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-gray-600">/{plan.duration} Tage</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  Jetzt kaufen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 