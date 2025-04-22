import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SESSION_COOKIE = 'session_token';

export interface Session {
  userId: string;
  createdAt: Date;
}

export async function createSession(userId: string): Promise<string> {
  const session: Session = {
    userId,
    createdAt: new Date(),
  };

  const token = sign(session, JWT_SECRET, { expiresIn: '7d' });
  
  // Set session cookie
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return token;
}

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  
  if (!token) {
    return null;
  }

  try {
    const session = verify(token, JWT_SECRET) as Session;
    return session;
  } catch (error) {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
} 