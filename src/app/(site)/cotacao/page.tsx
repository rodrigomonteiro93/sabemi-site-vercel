import type { Metadata } from 'next';
import CotacaoContent from './page-content';

export const metadata: Metadata = {
  title: 'Cotação de Seguro Viagem — Sabemi',
  description: 'Compare planos de seguro viagem e encontre a melhor cobertura para o seu destino.',
};

export default function CotacaoPage() {
  return <CotacaoContent />;
}
