import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import FinanceiroContent from './page-content';
import { getFinanceiro } from '@/lib/api/financeiro';

export const generateMetadata = createPageMetadata('financeiro');

export default async function FinanceiroPage() {
  const items = await getFinanceiro();
  return <FinanceiroContent items={items} />;
}

