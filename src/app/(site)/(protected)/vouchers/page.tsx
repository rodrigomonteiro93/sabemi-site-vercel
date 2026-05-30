import type { Metadata } from 'next';
import { generateMockVouchers } from '@/lib/types/vouchers';
import VouchersContent from './page-content';

export const metadata: Metadata = {
  title: 'Vouchers | Sabemi',
  description: 'Consulte seus vouchers de seguro viagem emitidos, aguardando ou cancelados.',
};

export default function VouchersPage() {
  const items = generateMockVouchers();
  return <VouchersContent items={items} agencyName="Agência Teste" />;
}
