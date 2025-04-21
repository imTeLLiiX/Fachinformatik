import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Rate Limiting Setup
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

// IP Whitelist (in Produktion durch Umgebungsvariable konfigurieren)
const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(',') || ['127.0.0.1'];

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
`;

export async function middleware(request: NextRequest) {
  // IP Whitelist Check
  const ip = request.ip || '127.0.0.1';
  if (!ALLOWED_IPS.includes(ip)) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  // Rate Limiting
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);
  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  // Authentication Check
  const token = await getToken({ req: request });
  if (!token && request.nextUrl.pathname.startsWith('/api/')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Response Headers
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', CSP);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
  ],
}; 