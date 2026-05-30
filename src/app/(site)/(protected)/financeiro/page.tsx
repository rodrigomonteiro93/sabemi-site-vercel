import type { Metadata } from 'next';
import FinanceiroContent from './page-content';
import { getFinanceiro } from '@/lib/api/financeiro';

export const metadata: Metadata = {
  title: 'Financeiro | Sabemi',
  description: 'Gerencie suas faturas e pagamentos na área logada Sabemi.',
};

export default async function FinanceiroPage() {
  const items = await getFinanceiro();
  return <FinanceiroContent items={items} />;
}
