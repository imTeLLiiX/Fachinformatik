// Define our own types that match the Prisma schema
export type Role = 'ADMIN' | 'USER';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'TRIAL';
export type SubscriptionTier = 'FREE' | 'BASIC' | 'PREMIUM';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
  stripeSubscriptionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = User;

export type UserUpdate = Partial<{
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
}>; 