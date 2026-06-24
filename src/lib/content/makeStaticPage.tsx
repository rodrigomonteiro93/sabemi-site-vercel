import StaticPage from '@/components/templates/StaticPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { STATIC_PAGES, type StaticPageSlug } from './staticPages';

export function makeStaticPage(slug: StaticPageSlug) {
  const content = STATIC_PAGES[slug];
  const generateMetadata = createPageMetadata(slug);

  function Page() {
    return <StaticPage {...content} />;
  }

  return { generateMetadata, Page };
}
