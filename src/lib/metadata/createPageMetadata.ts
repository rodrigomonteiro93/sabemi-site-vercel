import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/api/pages-metadata';
import type { PageKey } from '@/lib/types/pages-metadata';

export function createPageMetadata(key: PageKey) {
  return (): Promise<Metadata> => getPageMetadata(key);
}
