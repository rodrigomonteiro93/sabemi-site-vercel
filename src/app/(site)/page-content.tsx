import SiteHeader      from '@/components/organisms/SiteHeader';
import HeroSection     from '@/components/organisms/HeroSection';
import VideosSection   from '@/components/organisms/VideosSection';
import StepsSection    from '@/components/organisms/StepsSection';
import NewsSection     from '@/components/organisms/NewsSection';
import PartnersSection from '@/components/organisms/PartnersSection';
import SiteFooter      from '@/components/organisms/SiteFooter';
import WhatsAppFab     from '@/components/atoms/WhatsAppFab';
import CookieBanner    from '@/components/organisms/CookieBanner';
import type { VideoItem } from '@/lib/types/videos';
import type { NewsItem } from '@/lib/types/news';
import type { PartnerData } from '@/lib/types/partners';

interface HomeContentProps {
  videos: VideoItem[];
  news: NewsItem[];
  partners: PartnerData[];
}

export default function HomeContent({ videos, news, partners }: HomeContentProps) {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <VideosSection videos={videos} />
      <StepsSection />
      <NewsSection news={news} />
      <PartnersSection partners={partners} />
      <SiteFooter />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
