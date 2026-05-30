import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar/UserSidebar';
import FinanceiroListSection from '@/components/organisms/FinanceiroListSection/FinanceiroListSection';
import type { FinanceiroItem } from '@/lib/types/financeiro';
import styles from './page-content.module.css';

interface FinanceiroContentProps {
  items: FinanceiroItem[];
}

export default function FinanceiroContent({ items }: FinanceiroContentProps) {

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName="Agência Teste"
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/c/agencia-teste"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/agencia-teste"
            />
            <FinanceiroListSection items={items} />
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
