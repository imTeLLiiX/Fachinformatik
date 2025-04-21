import { Schema, model, models, Document } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'super-admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type SubscriptionType = 'basic' | 'premium' | 'enterprise';

export interface UserProgress {
  [courseId: string]: {
    completedModules: string[];
    completedExercises: string[];
    completedQuizzes: string[];
    lastAccessed: Date;
    progress: number;
  };
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  status?: 'active' | 'inactive';
  subscription?: {
    plan: string;
    startDate: Date;
    endDate: Date;
  };
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
  subscription?: SubscriptionType;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super-admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  subscription: {
    type: String,
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic',
  },
  progress: {
    type: Map,
    of: {
      completedModules: [String],
      completedExercises: [String],
      completedQuizzes: [String],
      lastAccessed: Date,
      progress: Number,
    },
    default: {},
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const User = models.User || model<UserDocument>('User', userSchema); 