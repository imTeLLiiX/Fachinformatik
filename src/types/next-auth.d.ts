import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isPremium: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role: 'user' | 'admin';
      isPremium: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
    isPremium: boolean;
  }
} 