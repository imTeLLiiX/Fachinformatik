import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

    // If user is on auth page and is authenticated, redirect to home
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // If user is not authenticated and trying to access protected route
    if (!isAuth && !isAuthPage) {
      const from = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
        return isAuthPage || !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/courses/:path*',
    '/games/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
}; 