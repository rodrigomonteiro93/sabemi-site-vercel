import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, hasAuthToken } from '@/lib/auth/session';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  return NextResponse.json({
    authenticated: hasAuthToken(token?.value),
  });
}
