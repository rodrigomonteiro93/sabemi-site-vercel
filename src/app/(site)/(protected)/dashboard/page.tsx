import type { Metadata } from 'next';
import DashboardPageContent from './page-content';
import { getDashboard } from '@/lib/api/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Sabemi',
  description: 'Painel de controle da sua agência parceira Sabemi.',
};

export default async function DashboardPage() {
  const data = await getDashboard();
  return (
    <DashboardPageContent
      agencyName={data.agencyName}
      cambio={data.cambio}
      comissoes={data.comissoes}
      kpis={data.kpis}
      vouchers={data.vouchers}
    />
  );
}
