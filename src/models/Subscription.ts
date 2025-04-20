import { ObjectId } from 'mongodb';

export interface SubscriptionDocument {
  _id?: ObjectId;
  userId: ObjectId;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionCreateInput {
  userId: string;
  planId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}

export interface SubscriptionUpdateInput {
  status?: 'active' | 'canceled' | 'expired';
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
} 