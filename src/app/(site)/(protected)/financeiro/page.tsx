import type { Metadata } from 'next';
import FinanceiroContent from './page-content';

export const metadata: Metadata = {
  title: 'Financeiro | Sabemi',
  description: 'Gerencie suas faturas e pagamentos na área logada Sabemi.',
};

export default function FinanceiroPage() {
  return <FinanceiroContent />;
}
