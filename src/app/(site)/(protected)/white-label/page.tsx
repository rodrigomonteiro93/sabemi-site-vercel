import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import PartnerAreaPage from '@/components/templates/PartnerAreaPage';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './page.module.css';

export const generateMetadata = createPageMetadata('white-label');

export default function WhiteLabelPage() {
  return (
    <PartnerAreaPage
      title="White Label"
      subtitle="Links personalizados e identidade visual para sua agência."
    >
      <div className={styles.card}>
        <div className={styles.field}>
          <label htmlFor="cotacao-link">Link de cotação</label>
          <input
            id="cotacao-link"
            readOnly
            value="https://sabemi.com.br/?ag=agencia-teste"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="cadastro-link">Link de cadastro de parceiro</label>
          <input
            id="cadastro-link"
            readOnly
            value="https://sabemi.com.br/cadastro/?ag=agencia-teste"
          />
        </div>
        <p>
          Compartilhe estes links com clientes e emissores. Para personalizar logotipo e cores,
          solicite ativação do white label ao suporte comercial.
        </p>
        <a href={ROUTES.cotacao} className={styles.link}>
          Ir para cotação →
        </a>
      </div>
    </PartnerAreaPage>
  );
}

