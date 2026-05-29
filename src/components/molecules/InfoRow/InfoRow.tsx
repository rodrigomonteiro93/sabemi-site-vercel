import type { ReactNode } from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueVariant?: 'default' | 'danger' | 'success' | 'mono';
}

export default function InfoRow({ icon, label, value, valueVariant = 'default' }: InfoRowProps) {
  const valueClass = [styles.v, valueVariant !== 'default' ? styles[valueVariant] : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.infoRow}>
      <span className={styles.ico}>{icon}</span>
      <span className={styles.k}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
