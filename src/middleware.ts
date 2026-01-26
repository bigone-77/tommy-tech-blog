import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import authConfig from '../auth.config';

const { auth } = NextAuth(authConfig);

const ADMIN_ROUTES = ['/blog/write', '/blog/edit'];

export default auth(async function middleware(req) {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.isAdmin;

  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (isAdminRoute) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
