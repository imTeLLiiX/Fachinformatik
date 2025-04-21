import { useSession } from 'next-auth/react';
import { User } from '@/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user as User | undefined;

  return {
    user,
    isAuthenticated: status === 'authenticated',
    isAdmin: user?.role === 'ADMIN',
    isLoading: status === 'loading',
  };
} 