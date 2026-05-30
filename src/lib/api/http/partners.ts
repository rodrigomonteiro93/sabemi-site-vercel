import { apiFetch } from '@/lib/api/client';
import type { PartnerData } from '@/lib/types/partners';
import type { PartnersRepository } from '@/lib/api/repositories';

export const httpPartnersRepository: PartnersRepository = {
  async getHomePartners() {
    return apiFetch<PartnerData[]>('/partners/home');
  },
};
