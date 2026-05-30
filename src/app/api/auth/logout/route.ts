import { NextResponse } from 'next/server';
import { clearAuthToken } from '@/lib/auth/clearAuthToken';

export async function GET(request: Request) {
  await clearAuthToken();
  return NextResponse.redirect(new URL('/login', request.url));
}

export async function POST() {
  await clearAuthToken();
  return NextResponse.json({ ok: true });
}
