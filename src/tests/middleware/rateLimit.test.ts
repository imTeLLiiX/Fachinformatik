import { describe, it, expect, vi } from 'vitest'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware } from '@/middleware'
import { ratelimit } from '@/lib/redis'

// Mock Redis rate limiter
vi.mock('@/lib/redis', () => ({
  ratelimit: {
    limit: vi.fn(),
  },
}))

describe('Rate Limiting Middleware', () => {
  it('should allow requests within rate limit', async () => {
    vi.mocked(ratelimit.limit).mockResolvedValueOnce({
      success: true,
      limit: 10,
      remaining: 9,
      reset: Date.now() + 1000,
    })

    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).not.toBe(429)
    expect(response.headers.get('X-RateLimit-Limit')).toBe('10')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('9')
  })

  it('should block requests exceeding rate limit', async () => {
    vi.mocked(ratelimit.limit).mockResolvedValueOnce({
      success: false,
      limit: 10,
      remaining: 0,
      reset: Date.now() + 1000,
    })

    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response.status).toBe(429)
    const data = await response.json()
    expect(data.error).toBe('Too many requests')
  })

  it('should not apply rate limiting to non-API routes', async () => {
    const request = new Request('http://localhost:3000/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(ratelimit.limit).not.toHaveBeenCalled()
  })
}) 