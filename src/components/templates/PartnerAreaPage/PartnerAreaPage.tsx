import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar';
import styles from './PartnerAreaPage.module.css';

interface PartnerAreaPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PartnerAreaPage({ title, subtitle, children }: PartnerAreaPageProps) {
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
            <section className={styles.content}>
              <div className={styles.titleBar}>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
              {children}
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
