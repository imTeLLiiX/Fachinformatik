import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import clientPromise from './mongodb';

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
          const isValid = await bcrypt.compare(credentials.password, user.password);
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