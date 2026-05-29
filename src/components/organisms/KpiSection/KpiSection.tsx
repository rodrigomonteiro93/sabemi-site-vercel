import KpiCard from '@/components/molecules/KpiCard';
import type { KpiItemData } from '@/lib/types/dashboard';
import styles from './KpiSection.module.css';

interface KpiSectionProps {
  title: string;
  items: KpiItemData[];
}

export default function KpiSection({ title, items }: KpiSectionProps) {
  return (
    <div>
      <div className={styles.sectionTtl2}>{title}</div>
      <div className={styles.kpiGrid}>
        {items.map((item) => (
          <KpiCard key={item.variant} {...item} />
        ))}
      </div>
    </div>
  );
}
