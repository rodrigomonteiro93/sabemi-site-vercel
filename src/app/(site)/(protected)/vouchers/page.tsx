import type { Metadata } from 'next';
import { getVouchers } from '@/lib/api/vouchers';
import VouchersContent from './page-content';

export const metadata: Metadata = {
  title: 'Vouchers | Sabemi',
  description: 'Consulte seus vouchers de seguro viagem emitidos, aguardando ou cancelados.',
};

export default async function VouchersPage() {
  const items = await getVouchers();
  return <VouchersContent items={items} agencyName="Agência Teste" />;
}
