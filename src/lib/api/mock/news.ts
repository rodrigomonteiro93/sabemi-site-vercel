import { HOME_NEWS_MOCK } from '@/lib/mocks/news';
import type { NewsRepository } from '@/lib/api/repositories';

export const mockNewsRepository: NewsRepository = {
  async getHomeNews() {
    return [...HOME_NEWS_MOCK];
  },
};
