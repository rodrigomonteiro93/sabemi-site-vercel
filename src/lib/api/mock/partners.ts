import { HOME_PARTNERS_MOCK } from '@/lib/mocks/partners';
import type { PartnersRepository } from '@/lib/api/repositories';

export const mockPartnersRepository: PartnersRepository = {
  async getHomePartners() {
    return [...HOME_PARTNERS_MOCK];
  },
};
