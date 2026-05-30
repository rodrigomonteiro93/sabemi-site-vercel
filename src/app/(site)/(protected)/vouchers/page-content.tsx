import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar/UserSidebar';
import VouchersListSection from '@/components/organisms/VouchersListSection/VouchersListSection';
import { VoucherPageItem } from '@/lib/types/vouchers';
import styles from './page-content.module.css';

interface VouchersContentProps {
  items: VoucherPageItem[];
  agencyName: string;
}

export default function VouchersContent({ items, agencyName }: VouchersContentProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName={agencyName}
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/?ref=agencia"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/?ref=agencia"
            />
            <section className={styles.content}>
              <VouchersListSection items={items} />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
