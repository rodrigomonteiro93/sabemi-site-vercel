import type { CadastroRequest } from '@/lib/types/cadastro';

export async function registerCadastro(data: CadastroRequest): Promise<void> {
  const response = await fetch('/api/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? 'Falha ao realizar cadastro');
  }
}
