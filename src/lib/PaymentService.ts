import { stripe } from './stripe';
import { connectToDatabase } from './mongodb';
import { User } from '@/models/User';

export class PaymentService {
  private db: any;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const { db } = await connectToDatabase();
    this.db = db;
  }

  async handleSubscription(
    userId: string,
    tier: 'monthly' | 'yearly' | 'lifetime'
  ) {
    try {
      const user = await this.db.collection('users').findOne({ _id: userId });
      
      if (!user) {
        throw new Error('Benutzer nicht gefunden');
      }

      // Erstelle oder hole den Stripe-Kunden
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: userId
          }
        });
        
        customerId = customer.id;
        
        await this.db.collection('users').updateOne(
          { _id: userId },
          { $set: { stripeCustomerId: customerId } }
        );
      }

      // Hole den Preis für das ausgewählte Abonnement
      const priceId = await this.getPriceId(tier);
      
      // Erstelle eine Checkout-Session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        metadata: {
          userId,
          tier
        }
      });

      return { sessionId: session.id };
    } catch (error) {
      console.error('Fehler bei der Abonnement-Verarbeitung:', error);
      throw error;
    }
  }

  private async getPriceId(tier: 'monthly' | 'yearly' | 'lifetime'): Promise<string> {
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    });

    const priceMap = {
      monthly: 'price_monthly',
      yearly: 'price_yearly',
      lifetime: 'price_lifetime'
    };

    const price = prices.data.find(p => p.id === process.env[priceMap[tier]]);
    
    if (!price) {
      throw new Error(`Preis für ${tier} nicht gefunden`);
    }

    return price.id;
  }

  async cancelSubscription(userId: string) {
    try {
      const user = await this.db.collection('users').findOne({ _id: userId });
      
      if (!user || !user.subscriptionId) {
        throw new Error('Aktives Abonnement nicht gefunden');
      }

      // Kündige das Abonnement bei Stripe
      await stripe.subscriptions.cancel(user.subscriptionId);
      
      // Aktualisiere den Benutzer in der Datenbank
      await this.db.collection('users').updateOne(
        { _id: userId },
        { 
          $set: { 
            subscription: null,
            subscriptionId: null
          }
        }
      );

      return true;
    } catch (error) {
      console.error('Fehler bei der Abonnement-Kündigung:', error);
      throw error;
    }
  }

  async updateSubscription(userId: string, newTier: 'monthly' | 'yearly' | 'lifetime') {
    try {
      const user = await this.db.collection('users').findOne({ _id: userId });
      
      if (!user || !user.subscriptionId) {
        throw new Error('Aktives Abonnement nicht gefunden');
      }

      // Hole den neuen Preis
      const newPriceId = await this.getPriceId(newTier);
      
      // Aktualisiere das Abonnement bei Stripe
      await stripe.subscriptions.update(user.subscriptionId, {
        items: [
          {
            id: user.subscriptionId,
            price: newPriceId
          }
        ]
      });

      return true;
    } catch (error) {
      console.error('Fehler bei der Abonnement-Aktualisierung:', error);
      throw error;
    }
  }
} 