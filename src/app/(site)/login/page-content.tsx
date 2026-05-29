import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import Button from '@/components/atoms/Button/Button';
import styles from './login.module.css';

export default function LoginContent() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loginGrid}>
            <section className={styles.colLeft}>
              <LoginForm />
            </section>
            <section className={styles.colRight}>
              <h2 className={styles.colRightTitle}>Não tem conta?</h2>
              <div className={styles.cadastrarWrap}>
                <Button variant="primary" href="/cadastro">
                  Cadastrar-se
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
