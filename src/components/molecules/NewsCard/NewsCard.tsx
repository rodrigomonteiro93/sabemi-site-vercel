import CategoryBadge from '@/components/atoms/CategoryBadge';
import Button from '@/components/atoms/Button';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  imageUrl: string;
  category: string;
  categoryVariant: 'intl' | 'tur';
  date: string;
  title: string;
}

export default function NewsCard({ imageUrl, category, categoryVariant, date, title }: NewsCardProps) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.photo} style={{ backgroundImage: `url('${imageUrl}')` }} />
      <div className={styles.body}>
        <CategoryBadge variant={categoryVariant}>{category}</CategoryBadge>
        <div className={styles.date}>{date}</div>
        <h3>{title}</h3>
        <Button variant="outline">IR PARA O TEXTO</Button>
      </div>
    </article>
  );
}
