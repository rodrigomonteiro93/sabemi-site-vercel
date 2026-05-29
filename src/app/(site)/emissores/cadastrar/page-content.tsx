import SiteHeader from '@/components/organisms/SiteHeader';
import UserSidebar from '@/components/organisms/UserSidebar';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import BackLink from '@/components/atoms/BackLink';
import EmissorCadastroForm from '@/components/organisms/EmissorCadastroForm';
import styles from './page.module.css';

export default function EmissorCadastrarContent() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName="Agência Teste"
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/parceiro/agencia-teste"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/agencia-teste"
            />
            <section className={styles.content}>
              <BackLink href="/emissores">
                Voltar para Emissores e Subcontas
              </BackLink>
              <div className={styles.pgTitleBar}>
                <h1 className={styles.h1}>
                  Cadastrar novo emissor{' '}
                  <small className={styles.h1Small}>preencha os dados abaixo</small>
                </h1>
              </div>
              <EmissorCadastroForm />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
