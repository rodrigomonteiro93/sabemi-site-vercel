import { apiFetch } from '@/lib/api/client';
import type { CadastroRepository } from '@/lib/api/repositories';
import type { CadastroRequest, CadastroResponse } from '@/lib/types/cadastro';

export const httpCadastroRepository: CadastroRepository = {
  register(data: CadastroRequest): Promise<CadastroResponse> {
    return apiFetch<CadastroResponse>('/cadastro', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
