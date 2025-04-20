import { ObjectId } from 'mongodb';
import { UserRole } from '@/types/user';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  isPremium: boolean;
  premiumExpiresAt?: Date;
  stripeCustomerId?: string;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isPremium?: boolean;
  premiumExpiresAt?: Date;
  stripeCustomerId?: string;
} 