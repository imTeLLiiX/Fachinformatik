import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentService } from '@/lib/stripe';
import { stripe } from '@/lib/stripe';

vi.mock('@/lib/stripe', () => ({
  stripe: {
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
      cancel: vi.fn(),
      retrieve: vi.fn(),
    },
  },
}));

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
    vi.clearAllMocks();
  });

  describe('createCheckoutSession', () => {
    it('erstellt eine Checkout-Session erfolgreich', async () => {
      const mockSession = { id: 'test_session_id' };
      vi.mocked(stripe.checkout.sessions.create).mockResolvedValue(mockSession);

      const result = await paymentService.createCheckoutSession(
        'test_customer_id',
        'test_price_id',
        'http://success.url',
        'http://cancel.url'
      );

      expect(result).toEqual(mockSession);
      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
        customer: 'test_customer_id',
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'test_price_id',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: 'http://success.url',
        cancel_url: 'http://cancel.url',
      });
    });

    it('behandelt Fehler beim Erstellen der Checkout-Session', async () => {
      vi.mocked(stripe.checkout.sessions.create).mockRejectedValue(new Error('Test error'));

      await expect(
        paymentService.createCheckoutSession(
          'test_customer_id',
          'test_price_id',
          'http://success.url',
          'http://cancel.url'
        )
      ).rejects.toThrow('Test error');
    });
  });

  describe('handleSubscription', () => {
    it('erstellt einen Preis für ein monatliches Abonnement', async () => {
      const mockPrice = { id: 'test_price_id' };
      vi.mocked(stripe.prices.create).mockResolvedValue(mockPrice);

      const result = await paymentService.handleSubscription('monthly');

      expect(result).toEqual(mockPrice);
      expect(stripe.prices.create).toHaveBeenCalledWith({
        unit_amount: 999,
        currency: 'eur',
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: 'Monatlich Premium',
        },
      });
    });

    it('erstellt einen Preis für ein jährliches Abonnement', async () => {
      const mockPrice = { id: 'test_price_id' };
      vi.mocked(stripe.prices.create).mockResolvedValue(mockPrice);

      const result = await paymentService.handleSubscription('yearly');

      expect(result).toEqual(mockPrice);
      expect(stripe.prices.create).toHaveBeenCalledWith({
        unit_amount: 9999,
        currency: 'eur',
        recurring: {
          interval: 'year',
        },
        product_data: {
          name: 'Jährlich Premium',
        },
      });
    });

    it('erstellt einen Preis für ein Lifetime-Abonnement', async () => {
      const mockPrice = { id: 'test_price_id' };
      vi.mocked(stripe.prices.create).mockResolvedValue(mockPrice);

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