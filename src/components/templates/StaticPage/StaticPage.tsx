import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import type { StaticPageContent } from '@/lib/content/staticPages';
import styles from './StaticPage.module.css';

export default function StaticPage({ title, paragraphs }: StaticPageContent) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className="container">
          <article className={styles.article}>
            <h1>{title}</h1>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
