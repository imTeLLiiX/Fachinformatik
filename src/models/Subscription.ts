import { SubscriptionStatus, SubscriptionTier } from '@prisma/client';

export type Subscription = {
  status: SubscriptionStatus;
  tier: SubscriptionTier;
}; 