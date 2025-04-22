import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow public assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname === '/api/webhooks/stripe'
  ) {
    return NextResponse.next();
  }

  // Handle API routes
  if (isApiRoute) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect admin routes
  if (isAdminPage) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect authenticated routes
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
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
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 