import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { getVouchers } from '@/lib/api/vouchers';
import VouchersContent from './page-content';

export const generateMetadata = createPageMetadata('vouchers');

export default async function VouchersPage() {
  const items = await getVouchers();
  return <VouchersContent items={items} agencyName="Agência Teste" />;
}

