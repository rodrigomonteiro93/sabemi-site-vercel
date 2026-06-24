import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  getSafeRedirectPath,
  hasAuthToken,
  isGuestOnlyPath,
  isProtectedPath,
} from '@/lib/auth/session';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authenticated = hasAuthToken(token);

  if (isProtectedPath(pathname) && !authenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnlyPath(pathname) && authenticated) {
    const destination = getSafeRedirectPath(searchParams.get('callbackUrl'));
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = destination;
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/cadastro',
    '/dashboard/:path*',
    '/vouchers/:path*',
    '/comissoes/:path*',
    '/financeiro/:path*',
    '/emissores/:path*',
    '/markup/:path*',
    '/tarifas-especiais/:path*',
    '/white-label/:path*',
  ],
};
