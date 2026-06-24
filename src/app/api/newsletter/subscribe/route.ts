import { NextResponse } from 'next/server';
import { getProvider } from '@/lib/api/provider';
import type { NewsletterSubscribeRequest } from '@/lib/types/newsletter';

export async function POST(request: Request) {
  try {
    const body: NewsletterSubscribeRequest = await request.json();
    await getProvider().newsletter.subscribe(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message === 'Nome e e-mail são obrigatórios' ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
