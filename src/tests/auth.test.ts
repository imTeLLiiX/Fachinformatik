import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { signIn } from 'next-auth/react';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

describe('Authentifizierung', () => {
  let db: any;

  beforeEach(async () => {
    const { db: database } = await connectToDatabase();
    db = database;
    
    // Test-Benutzer erstellen
    const hashedPassword = await hash('test123', 12);
    await db.collection('users').insertOne({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      role: 'learner'
    });
  });

  afterEach(async () => {
    // Test-Daten aufräumen
    await db.collection('users').deleteMany({});
  });

  it('sollte einen Benutzer erfolgreich einloggen', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'test123'
      }
    });

    const result = await signIn('credentials', {
      email: req.body.email,
      password: req.body.password,
      redirect: false
    });

    expect(result?.ok).toBe(true);
    expect(result?.error).toBeUndefined();
  });

  it('sollte bei falschem Passwort fehlschlagen', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword'
      }
    });

    const result = await signIn('credentials', {
      email: req.body.email,
      password: req.body.password,
      redirect: false
    });

    expect(result?.ok).toBe(false);
    expect(result?.error).toBe('Invalid credentials');
  });

  it('sollte bei nicht existierendem Benutzer fehlschlagen', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'nonexistent@example.com',
        password: 'test123'
      }
    });

    const result = await signIn('credentials', {
      email: req.body.email,
      password: req.body.password,
      redirect: false
    });

    expect(result?.ok).toBe(false);
    expect(result?.error).toBe('Invalid credentials');
  });

  it('sollte die Benutzerrolle korrekt setzen', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'test123'
      }
    });

    const result = await signIn('credentials', {
      email: req.body.email,
      password: req.body.password,
      redirect: false
    });

    expect(result?.ok).toBe(true);
    
    const session = await getSession({ req });
    expect(session?.user?.role).toBe('learner');
  });
}); 