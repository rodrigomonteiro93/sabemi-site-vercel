import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import EmissoresContent from './page-content';
import { getEmissores } from '@/lib/api/emissores';

export const generateMetadata = createPageMetadata('emissores');

export default async function EmissoresPage() {
  const items = await getEmissores();
  return <EmissoresContent items={items} />;
}

