import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hash, compare } from 'bcrypt';
import clientPromise from './mongodb';
import { createSession, deleteSession, getSession } from './session';
import { prisma } from './prisma';

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
          console.log('Attempting to connect to database...');
          const client = await clientPromise;
          const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
          console.log('Connected to database, searching for user...');
          
          const user = await db.collection('users').findOne({ email: credentials.email });
          console.log('User search result:', user ? 'User found' : 'No user found');

          if (!user) {
            throw new Error('No user found with this email');
          }

          console.log('Comparing passwords...');
          const isValid = await compare(credentials.password, user.password);
          console.log('Password comparison result:', isValid ? 'Valid' : 'Invalid');

          if (!isValid) {
            throw new Error('Invalid password');
          }

          console.log('Updating last login...');
          await db.collection('users').updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
          );

          console.log('Login successful, returning user data');
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium
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
        session.user.role = token.role as 'user' | 'admin';
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
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'user'
    }
  });

  const session = await createSession(user.id);
  return { user, session };
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const session = await createSession(user.id);
  return { user, session };
}

export async function signOut() {
  await deleteSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireRole(role: string) {
  const user = await requireAuth();
  if (user.role !== role) {
    throw new Error('Insufficient permissions');
  }
  return user;
} 