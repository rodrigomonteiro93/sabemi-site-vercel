import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar';
import CambioPanel from '@/components/organisms/CambioPanel';
import ComissoesPanel from '@/components/organisms/ComissoesPanel';
import KpiSection from '@/components/organisms/KpiSection';
import VoucherListSection from '@/components/organisms/VoucherListSection';
import type { ComissaoRow, VoucherItem, KpiItemData } from '@/lib/types/dashboard';
import styles from './page-content.module.css';

interface CambioPanelData {
  date: string;
  pair: string;
  currency: string;
  value: string;
  delta: string;
  deltaType: 'up' | 'down';
  updatedAt: string;
  histHref: string;
}

interface DashboardPageContentProps {
  agencyName: string;
  cambio: CambioPanelData;
  comissoes: { rows: ComissaoRow[]; allHref: string };
  kpis: { title: string; items: KpiItemData[] };
  vouchers: { title: string; vouchers: VoucherItem[]; allHref: string };
}

export default function DashboardPageContent({
  agencyName,
  cambio,
  comissoes,
  kpis,
  vouchers,
}: DashboardPageContentProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.dashGrid}>
            <UserSidebar
              agencyName={agencyName}
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/?ag=teste"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/?ag=teste"
            />
            <section className={styles.content}>
              <div className={styles.sectionTtl}>Dashboard</div>
              <div className={styles.heroRow}>
                <CambioPanel {...cambio} />
                <ComissoesPanel rows={comissoes.rows} allHref={comissoes.allHref} />
              </div>
              <KpiSection title={kpis.title} items={kpis.items} />
              <VoucherListSection
                title={vouchers.title}
                vouchers={vouchers.vouchers}
                allHref={vouchers.allHref}
              />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
