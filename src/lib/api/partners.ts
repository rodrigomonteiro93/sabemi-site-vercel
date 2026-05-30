import { getProvider } from '@/lib/api/provider';
import type { PartnerData } from '@/lib/types/partners';

export async function getHomePartners(): Promise<PartnerData[]> {
  return getProvider().partners.getHomePartners();
}
