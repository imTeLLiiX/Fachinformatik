import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hash, compare } from 'bcrypt';
import { createSession, deleteSession, getSession } from './session';
import { prisma } from './prisma';

type Role = 'USER' | 'ADMIN' | 'INSTRUCTOR';

const SALT_ROUNDS = 10;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Please enter an email and password');
        }

        try {
          console.log('Searching for user...');
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          console.log('User search result:', user ? 'User found' : 'No user found');

          if (!user) {
            throw new Error('No user found with this email');
          }

          console.log('Comparing passwords...');
          const isValid = await compare(credentials.password, user.passwordHash);
          console.log('Password comparison result:', isValid ? 'Valid' : 'Invalid');

          if (!isValid) {
            throw new Error('Invalid password');
          }

          console.log('Updating last login...');
          await prisma.user.update({
            where: { id: user.id },
            data: { updatedAt: new Date() }
          });

          console.log('Login successful, returning user data');
          return {
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            email: user.email,
            role: user.role as Role,
            isPremium: false // We'll implement this later
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.isPremium = token.isPremium as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function signUp(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password);
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      role: 'USER' as Role,
    },
  });

  return user;
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('No user found with this email');
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw new Error('Invalid password');
  }

  return user;
}

export async function signOut() {
  await deleteSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}

export async function requireRole(role: Role) {
  const user = await requireAuth();
  if (user.role !== role) {
    throw new Error('Not authorized');
  }
  return user;
} 