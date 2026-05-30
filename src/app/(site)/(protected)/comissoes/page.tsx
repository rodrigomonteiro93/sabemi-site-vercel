import type { Metadata } from 'next';
import ComissoesPageContent from './page-content';
import { getComissoes } from '@/lib/api/comissoes';

export const metadata: Metadata = {
  title: 'Comissões | Sabemi',
  description: 'Gerencie suas comissões de seguros Sabemi.',
};

export default async function ComissoesPage() {
  const comissoes = await getComissoes();
  return <ComissoesPageContent comissoes={comissoes} />;
}
