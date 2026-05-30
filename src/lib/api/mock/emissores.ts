import { EMISSORES_MOCK } from '@/lib/mocks/emissores';
import type { EmissoresRepository } from '@/lib/api/repositories';

export const mockEmissoresRepository: EmissoresRepository = {
  async getEmissores() {
    return [...EMISSORES_MOCK];
  },
};
