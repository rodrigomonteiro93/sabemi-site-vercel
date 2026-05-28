import NewsCard from '@/components/molecules/NewsCard';
import styles from './NewsSection.module.css';

const NEWS = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=70',
    category: 'Viagens Internacionais',
    categoryVariant: 'intl' as const,
    date: '19/05/2025',
    title: 'Argentina torna seguro viagem obrigatório: veja como se proteger e evitar problemas na imigração',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=70',
    category: 'Viagens & Turismo',
    categoryVariant: 'tur' as const,
    date: '21/08/2023',
    title: 'Uma linha do tempo do Turismo',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&q=70',
    category: 'Viagens & Turismo',
    categoryVariant: 'tur' as const,
    date: '15/08/2023',
    title: 'Recife de Corais ao redor do mundo',
  },
];

export default function NewsSection() {
  return (
    <section className={styles.news}>
      <div className="container">
        <div className={styles.newsHead}>
          <h2>Notícias e dicas para sua viagem</h2>
          <a href="#">Clique para acessar todas as notícias</a>
        </div>
        <div className={styles.newsGrid}>
          {NEWS.map((n, i) => (
            <NewsCard key={i} {...n} />
          ))}
        </div>
      </div>
    </section>
  );
}
