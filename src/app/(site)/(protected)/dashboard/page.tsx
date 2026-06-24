import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import DashboardPageContent from './page-content';
import { getDashboard } from '@/lib/api/dashboard';

export const generateMetadata = createPageMetadata('dashboard');

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

