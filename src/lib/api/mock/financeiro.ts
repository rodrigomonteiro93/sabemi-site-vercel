import { FINANCEIRO_MOCK } from '@/lib/mocks/financeiro';
import type { FinanceiroRepository } from '@/lib/api/repositories';

export const mockFinanceiroRepository: FinanceiroRepository = {
  async getFinanceiro() {
    return [...FINANCEIRO_MOCK];
  },
};
