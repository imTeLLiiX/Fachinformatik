export type SubscriptionPlan = 'basic' | 'premium' | 'enterprise';

export interface Subscription {
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
}

export interface UserSubscription {
  subscription?: Subscription;
} 