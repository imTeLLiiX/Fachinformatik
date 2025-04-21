import 'next-auth';
import { JWT } from 'next-auth/jwt';

type Role = 'USER' | 'ADMIN' | 'INSTRUCTOR';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    isPremium: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
      isPremium: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    isPremium: boolean;
  }
}