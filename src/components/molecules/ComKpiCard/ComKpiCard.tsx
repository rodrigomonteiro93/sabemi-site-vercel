import styles from './ComKpiCard.module.css';

interface ComKpiCardProps {
  label: string;
  value: string;
  sub: string;
  colorVariant?: 'default' | 'success' | 'warning';
}

export default function ComKpiCard({ label, value, sub, colorVariant = 'default' }: ComKpiCardProps) {
  return (
    <div className={`${styles.kpi} ${colorVariant !== 'default' ? styles[colorVariant] : ''}`}>
      <div className={styles.lbl}>{label}</div>
      <div className={styles.v}>{value}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  );
}
