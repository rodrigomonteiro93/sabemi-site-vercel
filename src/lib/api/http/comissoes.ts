import type { ComissoesRepository } from '@/lib/api/repositories';

export const httpComissoesRepository: ComissoesRepository = {
  async getComissoes() {
    throw new Error('getComissoes: not implemented');
  },
};
