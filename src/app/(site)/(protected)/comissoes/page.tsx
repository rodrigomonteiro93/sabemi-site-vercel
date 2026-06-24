import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import ComissoesPageContent from './page-content';
import { getComissoes } from '@/lib/api/comissoes';

export const generateMetadata = createPageMetadata('comissoes');

export default async function ComissoesPage() {
  const comissoes = await getComissoes();
  return <ComissoesPageContent comissoes={comissoes} />;
}

