import SiteHeader      from '@/components/organisms/SiteHeader';
import HeroSection     from '@/components/organisms/HeroSection';
import VideosSection   from '@/components/organisms/VideosSection';
import StepsSection    from '@/components/organisms/StepsSection';
import NewsSection     from '@/components/organisms/NewsSection';
import PartnersSection from '@/components/organisms/PartnersSection';
import SiteFooter      from '@/components/organisms/SiteFooter';
import WhatsAppFab     from '@/components/atoms/WhatsAppFab';
import CookieBanner    from '@/components/organisms/CookieBanner';

export default function HomeContent() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <VideosSection />
      <StepsSection />
      <NewsSection />
      <PartnersSection />
      <SiteFooter />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
