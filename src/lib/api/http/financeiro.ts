import type { FinanceiroRepository } from '@/lib/api/repositories';

export const httpFinanceiroRepository: FinanceiroRepository = {
  async getFinanceiro() {
    throw new Error('getFinanceiro: not implemented');
  },
};
