import type { ReactNode } from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  icon?: ReactNode;
  label: string;
  value?: string;
  valueVariant?: 'default' | 'danger' | 'success' | 'mono';
  variant?: 'default' | 'voucher';
  children?: ReactNode;
}

export default function InfoRow({
  icon,
  label,
  value,
  valueVariant = 'default',
  variant = 'default',
  children,
}: InfoRowProps) {
  const rowClass = [
    styles.infoRow,
    variant === 'voucher' && styles.voucherRow,
  ]
    .filter(Boolean)
    .join(' ');

  const valueClass = [
    styles.v,
    valueVariant === 'danger' && styles.danger,
    valueVariant === 'success' && styles.success,
    valueVariant === 'mono' && styles.mono,
  ]
    .filter(Boolean)
    .join(' ');

  const icoClass = [styles.ico, variant === 'voucher' && styles.icoVoucher].filter(Boolean).join(' ');

  return (
    <div className={rowClass}>
      {icon && <span className={icoClass}>{icon}</span>}
      <span className={styles.k}>{label}</span>
      <span className={valueClass}>{children ?? value}</span>
    </div>
  );
}
