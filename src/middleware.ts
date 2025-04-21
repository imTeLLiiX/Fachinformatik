import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ratelimit } from '@/lib/redis'

// IP Whitelist
const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(',') || ['127.0.0.1']

// Content Security Policy
const CSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.stripe.com;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  object-src 'none';
  frame-src 'self' https://js.stripe.com;
`

export async function middleware(request: NextRequest) {
  // Get IP address
  const ip = request.ip || '127.0.0.1'

  // Check IP whitelist
  if (!ALLOWED_IPS.includes(ip)) {
    return new NextResponse('Access denied', { status: 403 })
  }

  // Apply rate limiting
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)
  
  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    })
  }

  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('Content-Security-Policy', CSP.replace(/\s+/g, ' ').trim())
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Check authentication for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 