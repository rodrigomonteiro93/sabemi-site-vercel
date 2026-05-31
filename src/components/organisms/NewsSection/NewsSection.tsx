import NewsCard from '@/components/molecules/NewsCard';
import type { NewsItem } from '@/lib/types/news';
import styles from './NewsSection.module.css';

interface NewsSectionProps {
  news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className={styles.news}>
      <div className="container">
        <div className={styles.newsHead}>
          <h2>Notícias e dicas para sua viagem</h2>
          <a href="#">Clique para acessar todas as notícias</a>
        </div>
        <div className={styles.newsGrid}>
          {news.map((n) => (
            <NewsCard key={n.id} {...n} />
          ))}
        </div>
      </div>
    </section>
  );
}
