import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import CadastroForm from '@/components/organisms/CadastroForm';
import styles from './page.module.css';

export default function CadastroContent() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <h1 className={styles.pageTitle}>Cadastre-se</h1>
          <CadastroForm />
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
