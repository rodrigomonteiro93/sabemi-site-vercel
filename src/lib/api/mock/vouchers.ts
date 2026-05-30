import { VOUCHERS_MOCK } from '@/lib/mocks/vouchers';
import type { VouchersRepository } from '@/lib/api/repositories';

export const mockVouchersRepository: VouchersRepository = {
  async getVouchers() {
    return [...VOUCHERS_MOCK];
  },
};
