import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import PartnerAreaPage from '@/components/templates/PartnerAreaPage';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './page.module.css';

export const generateMetadata = createPageMetadata('tarifas-especiais');

export default function TarifasEspeciaisPage() {
  return (
    <PartnerAreaPage
      title="Tarifas Especiais"
      subtitle="Planos e condições comerciais exclusivas para parceiros Sabemi."
    >
      <div className={styles.card}>
        <p>
          Consulte tarifas promocionais por destino e temporada. Para ativar uma tarifa especial,
          entre em contato com seu gerente comercial ou acesse a cotação em{' '}
          <a href={ROUTES.cotacao}>Cotar / Emitir</a>.
        </p>
        <ul>
          <li>Brasil — condição parceiro ativa</li>
          <li>América do Sul — campanha sazonal</li>
          <li>Europa (Schengen) — tabela corporativa</li>
        </ul>
      </div>
    </PartnerAreaPage>
  );
}

