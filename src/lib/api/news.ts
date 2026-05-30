import { getProvider } from '@/lib/api/provider';
import type { NewsItem } from '@/lib/types/news';

export async function getHomeNews(): Promise<NewsItem[]> {
  return getProvider().news.getHomeNews();
}
