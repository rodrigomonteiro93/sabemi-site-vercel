import type { Metadata } from 'next';
import EmissoresContent from './page-content';
import { getEmissores } from '@/lib/api/emissores';

export const metadata: Metadata = {
  title: 'Emissores e Subcontas | Sabemi',
  description: 'Gerencie seus emissores e subcontas da Sabemi Seguradora.',
};

export default async function EmissoresPage() {
  const items = await getEmissores();
  return <EmissoresContent items={items} />;
}
