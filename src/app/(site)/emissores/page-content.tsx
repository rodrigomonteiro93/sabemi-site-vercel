import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar';
import EmissoresListSection from '@/components/organisms/EmissoresListSection';
import { EmissorItem } from '@/lib/types/emissores';
import styles from './page-content.module.css';

interface EmissoresContentProps {
  items: EmissorItem[];
}

export default function EmissoresContent({ items }: EmissoresContentProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName="Agência Teste"
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/?ag=agencia-teste"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/?ag=agencia-teste"
            />
            <EmissoresListSection items={items} />
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
