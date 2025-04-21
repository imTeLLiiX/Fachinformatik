import { Document } from 'mongodb';
import { Subscription } from '@/types/subscription';

export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status?: UserStatus;
  subscription?: Subscription;
  progress?: {
    [moduleId: string]: {
      completed: boolean;
      score?: number;
      lastAccessed: Date;
    };
  };
  isPremium: boolean;
  createdAt: Date;
  updatedAt?: Date;
  lastLogin: Date;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  subscription?: Subscription;
} 