import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProvider } from '@/lib/api/provider';
import type { LoginRequest } from '@/lib/types/auth';

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { token } = await getProvider().auth.login(body);

    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800, // 8 horas
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message === 'Credenciais inválidas' ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
