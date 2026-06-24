import { PAGES_METADATA_MOCK } from '@/lib/mocks/pages-metadata';
import type { PagesMetadataRepository } from '@/lib/api/repositories';

export const mockPagesMetadataRepository: PagesMetadataRepository = {
  async getPagesMetadata() {
    return { ...PAGES_METADATA_MOCK };
  },
};
