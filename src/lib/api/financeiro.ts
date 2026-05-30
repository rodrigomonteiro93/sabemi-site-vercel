import { getProvider } from '@/lib/api/provider';
import type { FinanceiroItem } from '@/lib/types/financeiro';

export async function getFinanceiro(): Promise<FinanceiroItem[]> {
  return getProvider().financeiro.getFinanceiro();
}
