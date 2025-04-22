import { describe, it, expect } from 'vitest';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

describe('Role Validation Tests', () => {
  it('sollte einen Benutzer mit Admin-Rolle validieren', async () => {
    const mockSession = {
      user: {
        id: 'test-user-1',
        email: 'admin@test.com',
        role: 'admin',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const session = await getServerSession(authOptions);
    expect(session?.user?.role).toBe('admin');
  });

  it('sollte einen Benutzer mit Basic-Rolle validieren', async () => {
    const mockSession = {
      user: {
        id: 'test-user-2',
        email: 'user@test.com',
        role: 'basic',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const session = await getServerSession(authOptions);
    expect(session?.user?.role).toBe('basic');
  });

  it('sollte einen Benutzer mit Premium-Rolle validieren', async () => {
    const mockSession = {
      user: {
        id: 'test-user-3',
        email: 'premium@test.com',
        role: 'premium',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const session = await getServerSession(authOptions);
    expect(session?.user?.role).toBe('premium');
  });

  it('sollte einen nicht authentifizierten Benutzer erkennen', async () => {
    const session = await getServerSession(authOptions);
    expect(session).toBeNull();
  });

  it('sollte eine abgelaufene Session erkennen', async () => {
    const mockSession = {
      user: {
        id: 'test-user-4',
        email: 'expired@test.com',
        role: 'basic',
      },
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    };

    const session = await getServerSession(authOptions);
    expect(session).toBeNull();
  });
}); 