import type { VouchersRepository } from '@/lib/api/repositories';

export const httpVouchersRepository: VouchersRepository = {
  async getVouchers() {
    throw new Error('getVouchers: not implemented');
  },
};
