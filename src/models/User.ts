import { User as PrismaUser, Role, SubscriptionStatus, SubscriptionTier } from '@prisma/client';

export type User = PrismaUser;
export type UserDocument = PrismaUser;

export type UserUpdate = Partial<{
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
}>; 