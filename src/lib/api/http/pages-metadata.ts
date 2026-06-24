import { apiFetch } from '@/lib/api/client';
import type { PagesMetadata } from '@/lib/types/pages-metadata';
import type { PagesMetadataRepository } from '@/lib/api/repositories';

export const httpPagesMetadataRepository: PagesMetadataRepository = {
  async getPagesMetadata() {
    return apiFetch<PagesMetadata>('/pages/metadata');
  },
};
