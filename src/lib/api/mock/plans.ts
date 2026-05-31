import { PLANS_MOCK } from '@/lib/mocks/plans';
import type { PlansRepository } from '@/lib/api/repositories';

export const mockPlansRepository: PlansRepository = {
  async getPlanos(_params) {
    void _params;
    return PLANS_MOCK.map((plan) => ({ ...plan }));
  },
};
