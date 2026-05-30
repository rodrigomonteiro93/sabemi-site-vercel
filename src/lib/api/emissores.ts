import { getProvider } from '@/lib/api/provider';
import type { EmissorItem } from '@/lib/types/emissores';

export async function getEmissores(): Promise<EmissorItem[]> {
  return getProvider().emissores.getEmissores();
}
