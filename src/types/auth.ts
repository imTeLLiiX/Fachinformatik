export type Role = 'USER' | 'ADMIN' | 'INSTRUCTOR';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthError {
  message: string;
  status: number;
} 