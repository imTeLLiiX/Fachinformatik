export type Role = 'USER' | 'ADMIN';

export type SubscriptionTier = 'FREE' | 'BASIC' | 'PREMIUM';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'PAST_DUE' | 'TRIALING' | 'UNPAID';

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  emailVerified: Date | null;
  image: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  subscriptionTier: SubscriptionTier | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string | null;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  user: string;
  email: string;
  status: SubscriptionStatus;
  tier: SubscriptionTier;
} 