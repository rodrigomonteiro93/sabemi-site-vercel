import { getProvider } from '@/lib/api/provider';
import type { EmissorItem } from '@/lib/types/emissores';

export async function getEmissores(): Promise<EmissorItem[]> {
  return getProvider().emissores.getEmissores();
}

export async function getEmissorById(id: number): Promise<EmissorItem | null> {
  const items = await getEmissores();
  return items.find((item) => item.id === id) ?? null;
}
