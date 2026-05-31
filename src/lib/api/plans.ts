import { getProvider } from '@/lib/api/provider';
import type { CotacaoPlan, CotacaoParams } from '@/lib/types/cotacao';

export async function getPlanos(params: CotacaoParams): Promise<CotacaoPlan[]> {
  return getProvider().plans.getPlanos(params);
}
