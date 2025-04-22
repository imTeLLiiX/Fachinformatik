import { describe, it, expect } from 'vitest';
import { PaymentService, PAYMENT_PLANS } from '@/lib/stripe';

describe('Payment Calculations Tests', () => {
  const paymentService = new PaymentService();

  it('sollte die korrekten Preise für monatliche Abonnements berechnen', () => {
    const monthlyPlan = PAYMENT_PLANS.monthly;
    expect(monthlyPlan.price).toBe(9.99);
    expect(monthlyPlan.interval).toBe('month');
  });

  it('sollte die korrekten Preise für jährliche Abonnements berechnen', () => {
    const yearlyPlan = PAYMENT_PLANS.yearly;
    expect(yearlyPlan.price).toBe(99.99);
    expect(yearlyPlan.interval).toBe('year');
  });

  it('sollte die korrekten Preise für Lifetime-Abonnements berechnen', () => {
    const lifetimePlan = PAYMENT_PLANS.lifetime;
    expect(lifetimePlan.price).toBe(299.99);
    expect(lifetimePlan.interval).toBe('once');
  });

  it('sollte einen monatlichen Preis in Cents konvertieren', async () => {
    const price = await paymentService.handleSubscription('monthly');
    expect(price.unit_amount).toBe(999); // 9.99 EUR in Cents
  });

  it('sollte einen jährlichen Preis in Cents konvertieren', async () => {
    const price = await paymentService.handleSubscription('yearly');
    expect(price.unit_amount).toBe(9999); // 99.99 EUR in Cents
  });

  it('sollte einen Lifetime-Preis in Cents konvertieren', async () => {
    const price = await paymentService.handleSubscription('lifetime');
    expect(price.unit_amount).toBe(29999); // 299.99 EUR in Cents
  });

  it('sollte einen ungültigen Abonnement-Typ ablehnen', async () => {
    await expect(
      paymentService.handleSubscription('invalid' as any)
    ).rejects.toThrow('Ungültiger Abonnement-Typ');
  });
}); 