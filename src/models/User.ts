export type UserRole = 'admin' | 'instructor' | 'learner';
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

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  subscription: SubscriptionType;
  progress: UserProgress;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  status?: UserStatus;
  subscription?: SubscriptionType;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  subscription?: SubscriptionType;
} 