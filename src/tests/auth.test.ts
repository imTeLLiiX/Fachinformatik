import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { signIn } from 'next-auth/react';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import type { User, SubscriptionTier, SubscriptionStatus, Role } from '@/models/User';

describe('Authentifizierung', () => {
  beforeEach(async () => {
    // Test-Benutzer erstellen
    const hashedPassword = await hash('test123', 12);
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'USER' as Role,
        subscriptionStatus: null
      }
    });
  });

  afterEach(async () => {
    // Test-Daten aufräumen
    await prisma.user.deleteMany({});
  });

  it('sollte einen Benutzer erfolgreich einloggen', async () => {
    const result = await signIn('credentials', {
      email: 'test@example.com',
      password: 'test123',
      redirect: false
    });

    expect(result?.ok).toBe(true);
    expect(result?.error).toBeUndefined();
  });

  it('sollte bei falschem Passwort fehlschlagen', async () => {
    const result = await signIn('credentials', {
      email: 'test@example.com',
      password: 'wrongpassword',
      redirect: false
    });

    expect(result?.ok).toBe(false);
    expect(result?.error).toBe('Invalid credentials');
  });

  it('sollte bei nicht existierendem Benutzer fehlschlagen', async () => {
    const result = await signIn('credentials', {
      email: 'nonexistent@example.com',
      password: 'test123',
      redirect: false
    });

    expect(result?.ok).toBe(false);
    expect(result?.error).toBe('Invalid credentials');
  });

  it('sollte die Benutzerrolle korrekt setzen', async () => {
    const result = await signIn('credentials', {
      email: 'test@example.com',
      password: 'test123',
      redirect: false
    });

    expect(result?.ok).toBe(true);
    
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    expect(user?.role).toBe('USER');
  });
}); 