export type UserRole = 'admin' | 'queen' | 'support' | 'premium' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  isPremium: boolean;
  premiumExpiresAt?: Date;
}

export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  activeUsers: number;
  revenue: number;
}

export interface UserManagementData {
  users: User[];
  stats: AdminStats;
} 