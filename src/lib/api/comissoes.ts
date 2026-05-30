import { getProvider } from '@/lib/api/provider';
import type { ComissaoItem } from '@/lib/types/comissoes';

export async function getComissoes(): Promise<ComissaoItem[]> {
  return getProvider().comissoes.getComissoes();
}
