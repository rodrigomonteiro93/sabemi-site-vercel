import { NextResponse } from 'next/server';
import { getProvider } from '@/lib/api/provider';
import type { CadastroRequest } from '@/lib/types/cadastro';

export async function POST(request: Request) {
  try {
    const body: CadastroRequest = await request.json();
    await getProvider().cadastro.register(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message === 'Preencha todos os campos obrigatórios' ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
