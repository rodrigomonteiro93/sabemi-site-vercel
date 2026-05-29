import styles from './ComKpiCard.module.css';

interface ComKpiCardProps {
  label: string;
  value: string;
  sub: string;
  colorVariant?: 'default' | 'success' | 'warning' | 'danger';
  valueSize?: 'default' | 'compact';
}

export default function ComKpiCard({
  label,
  value,
  sub,
  colorVariant = 'default',
  valueSize = 'default',
}: ComKpiCardProps) {
  const kpiClass = [
    styles.kpi,
    colorVariant !== 'default' ? styles[colorVariant] : '',
    valueSize === 'compact' ? styles.compactValue : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={kpiClass}>
      <div className={styles.lbl}>{label}</div>
      <div className={styles.v}>{value}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  );
}
