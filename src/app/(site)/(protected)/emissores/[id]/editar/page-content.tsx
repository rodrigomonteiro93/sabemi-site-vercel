import SiteHeader from '@/components/organisms/SiteHeader';
import UserSidebar from '@/components/organisms/UserSidebar';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import BackLink from '@/components/atoms/BackLink';
import EmissorCadastroForm from '@/components/organisms/EmissorCadastroForm';
import type { EmissorItem } from '@/lib/types/emissores';
import styles from './page.module.css';

interface EmissorEditarContentProps {
  emissor: EmissorItem;
}

export default function EmissorEditarContent({ emissor }: EmissorEditarContentProps) {
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
              <BackLink href="/emissores">Voltar para Emissores e Subcontas</BackLink>
              <div className={styles.pgTitleBar}>
                <h1 className={styles.h1}>
                  Editar emissor{' '}
                  <small className={styles.h1Small}>{emissor.nome}</small>
                </h1>
              </div>
              <EmissorCadastroForm
                mode="edit"
                emissorId={emissor.id}
                defaultValues={{
                  perfil: emissor.perfil,
                  nome: emissor.nome,
                  email: emissor.email,
                  telefone: emissor.tel,
                  cpf: emissor.cpf,
                }}
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
