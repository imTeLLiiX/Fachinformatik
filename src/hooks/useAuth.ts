import { useSession } from 'next-auth/react';
import { User } from '@/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user as User | undefined;
  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading: status === 'loading',
  };
} 