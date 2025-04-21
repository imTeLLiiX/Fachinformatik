import { describe, it, expect, vi } from 'vitest'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware } from '@/middleware'
import { getToken } from 'next-auth/jwt'

// Mock next-auth
vi.mock('next-auth/jwt', () => ({
  getToken: vi.fn(),
}))

describe('Authentication Middleware', () => {
  it('should allow authenticated requests to API routes', async () => {
    vi.mocked(getToken).mockResolvedValueOnce({
      email: 'test@example.com',
      role: 'USER',
    })

    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).not.toBe(401)
  })

  it('should block unauthenticated requests to API routes', async () => {
    vi.mocked(getToken).mockResolvedValueOnce(null)

    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })

  it('should not check authentication for non-API routes', async () => {
    const request = new Request('http://localhost:3000/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(getToken).not.toHaveBeenCalled()
  })

  it('should handle authentication errors gracefully', async () => {
    vi.mocked(getToken).mockRejectedValueOnce(new Error('Auth error'))

    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })
}) 