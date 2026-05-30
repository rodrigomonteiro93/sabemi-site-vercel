import type { Metadata } from 'next';
import { getHomeVideos } from '@/lib/api/videos';
import { getHomeNews } from '@/lib/api/news';
import { getHomePartners } from '@/lib/api/partners';
import HomeContent from './page-content';

export const metadata: Metadata = {
  title: 'Sabemi Seguros — Seguro Viagem',
  description: 'Cote, compare e emita sua apólice em minutos com a confiança de quem cuida do que importa há mais de 50 anos.',
};

export default async function HomePage() {
  const [videos, news, partners] = await Promise.all([
    getHomeVideos(),
    getHomeNews(),
    getHomePartners(),
  ]);
  return <HomeContent videos={videos} news={news} partners={partners} />;
}
