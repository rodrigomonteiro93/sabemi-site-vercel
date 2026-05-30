import { getProvider } from '@/lib/api/provider';
import type { VoucherPageItem } from '@/lib/types/vouchers';

export async function getVouchers(): Promise<VoucherPageItem[]> {
  return getProvider().vouchers.getVouchers();
}
