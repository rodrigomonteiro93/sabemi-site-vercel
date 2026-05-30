import type { EmissoresRepository } from '@/lib/api/repositories';

export const httpEmissoresRepository: EmissoresRepository = {
  async getEmissores() {
    throw new Error('getEmissores: not implemented');
  },
};
