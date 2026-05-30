import { apiFetch } from '@/lib/api/client';
import type { NewsItem } from '@/lib/types/news';
import type { NewsRepository } from '@/lib/api/repositories';

export const httpNewsRepository: NewsRepository = {
  async getHomeNews() {
    return apiFetch<NewsItem[]>('/news/home');
  },
};
