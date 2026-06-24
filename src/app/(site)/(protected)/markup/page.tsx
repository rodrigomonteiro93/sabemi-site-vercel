import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import PartnerAreaPage from '@/components/templates/PartnerAreaPage';
import MarkupSettingsSection from './page-content';
import { ROUTES } from '@/lib/navigation/siteRoutes';

export const generateMetadata = createPageMetadata('markup');

export default function MarkupPage() {
  return (
    <PartnerAreaPage
      title="Markup"
      subtitle="Defina o markup padrão aplicado nas cotações da sua agência."
    >
      <MarkupSettingsSection cotacaoHref={ROUTES.cotacao} />
    </PartnerAreaPage>
  );
}

