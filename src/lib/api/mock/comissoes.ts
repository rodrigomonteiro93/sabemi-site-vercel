import { COMISSOES_MOCK } from '@/lib/mocks/comissoes';
import type { ComissoesRepository } from '@/lib/api/repositories';

export const mockComissoesRepository: ComissoesRepository = {
  async getComissoes() {
    return [...COMISSOES_MOCK];
  },
};
