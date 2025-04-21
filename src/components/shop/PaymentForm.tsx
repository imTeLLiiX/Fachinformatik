import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PAYMENT_PLANS } from '@/lib/stripe';

const PaymentForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = searchParams?.get('plan');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planKey) {
      setError('Bitte wählen Sie einen Plan aus');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planKey }),
      });

      if (!response.ok) {
        throw new Error('Fehler bei der Erstellung der Checkout-Session');
      }

      const { sessionId } = await response.json();
      router.push(`/shop/payment?session_id=${sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = planKey ? PAYMENT_PLANS[planKey] : null;

  if (!selectedPlan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Bitte wählen Sie einen Plan aus</h2>
        <p className="mt-2 text-gray-600">
          <a href="/shop" className="text-blue-600 hover:text-blue-500">
            Zurück zum Shop
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Zahlungsabwicklung
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ausgewählter Plan: {selectedPlan.name}
          </h3>
          <p className="text-gray-600">
            Preis: {selectedPlan.price / 100}€
            {selectedPlan.interval && `/${selectedPlan.interval === 'month' ? 'Monat' : 'Jahr'}`}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Wird verarbeitet...' : 'Jetzt bezahlen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm; 