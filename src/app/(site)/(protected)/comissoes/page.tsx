import type { Metadata } from 'next';
import ComissoesPageContent from './page-content';
import { COMISSOES_MOCK } from '@/lib/mocks/comissoes';

export const metadata: Metadata = {
  title: 'Comissões | Sabemi',
  description: 'Gerencie suas comissões de seguros Sabemi.',
};

export default function ComissoesPage() {
  return <ComissoesPageContent comissoes={COMISSOES_MOCK} />;
}
