import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { getHomeVideos } from '@/lib/api/videos';
import { getHomeNews } from '@/lib/api/news';
import { getHomePartners } from '@/lib/api/partners';
import HomeContent from './page-content';

export const generateMetadata = createPageMetadata('home');

export default async function HomePage() {
  const [videos, news, partners] = await Promise.all([
    getHomeVideos(),
    getHomeNews(),
    getHomePartners(),
  ]);
  return <HomeContent videos={videos} news={news} partners={partners} />;
}

