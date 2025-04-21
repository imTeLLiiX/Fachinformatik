import { describe, it, expect } from 'vitest'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

describe('Security Headers Middleware', () => {
  it('should set all security headers', async () => {
    const request = new Request('http://localhost:3000/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.headers.get('X-DNS-Prefetch-Control')).toBe('on')
    expect(response.headers.get('Strict-Transport-Security')).toBe('max-age=63072000; includeSubDomains; preload')
    expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block')
    expect(response.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(response.headers.get('Referrer-Policy')).toBe('origin-when-cross-origin')
    expect(response.headers.get('Content-Security-Policy')).toBeTruthy()
    expect(response.headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()')
  })

  it('should have a valid Content Security Policy', async () => {
    const request = new Request('http://localhost:3000/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)
    const csp = response.headers.get('Content-Security-Policy')

    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'")
    expect(csp).toContain("style-src 'self' 'unsafe-inline'")
    expect(csp).toContain("img-src 'self' data: https:")
    expect(csp).toContain("font-src 'self'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("base-uri 'self'")
    expect(csp).toContain("form-action 'self'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain('block-all-mixed-content')
    expect(csp).toContain('upgrade-insecure-requests')
  })

  it('should set security headers for API routes', async () => {
    const request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.headers.get('Content-Security-Policy')).toBeTruthy()
    expect(response.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
  })

  it('should set security headers for static assets', async () => {
    const request = new Request('http://localhost:3000/_next/static/test.js', {
      method: 'GET',
    }) as NextRequest

    const response = await middleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.headers.get('Content-Security-Policy')).toBeTruthy()
    expect(response.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
  })
}) 