import type { Metadata } from 'next';
import EmissoresContent from './page-content';
import { EMISSORES_STATIC } from '@/lib/data/emissores';

export const metadata: Metadata = {
  title: 'Emissores e Subcontas | Sabemi',
  description: 'Gerencie seus emissores e subcontas da Sabemi Seguradora.',
};

export default function EmissoresPage() {
  return <EmissoresContent items={EMISSORES_STATIC} />;
}
