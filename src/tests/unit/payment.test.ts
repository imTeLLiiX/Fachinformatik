import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentService } from '@/lib/stripe';
import Stripe from 'stripe';

// Mock Stripe
vi.mock('stripe', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn(),
        },
      },
      customers: {
        create: vi.fn(),
      },
      prices: {
        create: vi.fn(),
      },
      subscriptions: {
        create: vi.fn(),
        cancel: vi.fn(),
        retrieve: vi.fn(),
      },
    })),
  };
});

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockStripe: jest.Mocked<Stripe>;

  beforeEach(() => {
    mockStripe = new Stripe('test_key') as jest.Mocked<Stripe>;
    paymentService = new PaymentService();
  });

  describe('createCheckoutSession', () => {
    it('should create a checkout session successfully', async () => {
      const mockSession = {
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/test',
      };

      mockStripe.checkout.sessions.create.mockResolvedValueOnce(mockSession);

      const result = await paymentService.createCheckoutSession({
        customerId: 'cus_123',
        priceId: 'price_123',
      });

      expect(result).toEqual(mockSession);
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_123',
        line_items: [{ price: 'price_123', quantity: 1 }],
        mode: 'subscription',
        success_url: expect.any(String),
        cancel_url: expect.any(String),
      });
    });

    it('should handle errors when creating checkout session', async () => {
      mockStripe.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe error'));

      await expect(
        paymentService.createCheckoutSession({
          customerId: 'cus_123',
          priceId: 'price_123',
        })
      ).rejects.toThrow('Stripe error');
    });
  });

  describe('handleSubscription', () => {
    it('should create monthly subscription price', async () => {
      const mockPrice = {
        id: 'price_monthly',
        product: 'prod_123',
        unit_amount: 999,
        currency: 'usd',
        recurring: { interval: 'month' },
      };

      mockStripe.prices.create.mockResolvedValueOnce(mockPrice);

      const result = await paymentService.handleSubscription('monthly');

      expect(result).toEqual(mockPrice);
      expect(mockStripe.prices.create).toHaveBeenCalledWith({
        product: expect.any(String),
        unit_amount: 999,
        currency: 'usd',
        recurring: { interval: 'month' },
      });
    });

    it('should create yearly subscription price', async () => {
      const mockPrice = {
        id: 'price_yearly',
        product: 'prod_123',
        unit_amount: 9999,
        currency: 'usd',
        recurring: { interval: 'year' },
      };

      mockStripe.prices.create.mockResolvedValueOnce(mockPrice);

      const result = await paymentService.handleSubscription('yearly');

      expect(result).toEqual(mockPrice);
      expect(mockStripe.prices.create).toHaveBeenCalledWith({
        product: expect.any(String),
        unit_amount: 9999,
        currency: 'usd',
        recurring: { interval: 'year' },
      });
    });

    it('should create lifetime subscription price', async () => {
      const mockPrice = {
        id: 'price_lifetime',
        product: 'prod_123',
        unit_amount: 29999,
        currency: 'usd',
      };

      mockStripe.prices.create.mockResolvedValueOnce(mockPrice);

      const result = await paymentService.handleSubscription('lifetime');

      expect(result).toEqual(mockPrice);
      expect(stripe.prices.create).toHaveBeenCalledWith({
        unit_amount: 29999,
        currency: 'eur',
        product_data: {
          name: 'Einmalig Premium',
        },
      });
    });
  });

  describe('cancelSubscription', () => {
    it('kündigt ein Abonnement erfolgreich', async () => {
      const mockSubscription = { id: 'test_subscription_id', status: 'canceled' };
      vi.mocked(stripe.subscriptions.cancel).mockResolvedValue(mockSubscription);

      const result = await paymentService.cancelSubscription('test_subscription_id');

      expect(result).toEqual(mockSubscription);
      expect(stripe.subscriptions.cancel).toHaveBeenCalledWith('test_subscription_id');
    });

    it('behandelt Fehler beim Kündigen eines Abonnements', async () => {
      vi.mocked(stripe.subscriptions.cancel).mockRejectedValue(new Error('Test error'));

      await expect(
        paymentService.cancelSubscription('test_subscription_id')
      ).rejects.toThrow('Test error');
    });
  });
}); 