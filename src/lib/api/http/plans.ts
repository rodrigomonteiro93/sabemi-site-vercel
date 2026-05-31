import type { PlansRepository } from '@/lib/api/repositories';

export const httpPlansRepository: PlansRepository = {
  async getPlanos(_params) {
    void _params;
    throw new Error('getPlanos: not implemented');
  },
};
