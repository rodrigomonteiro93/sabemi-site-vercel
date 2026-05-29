import type { ReactNode } from 'react';
import styles from './KpiCard.module.css';

type KpiVariant = 'vouchers' | 'comissoes' | 'faturas';

interface KpiCardProps {
  variant: KpiVariant;
  label: string;
  value: string;
  valueSmall?: string;
  sub: string;
}

const ICONS: Record<KpiVariant, ReactNode> = {
  vouchers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="14 5 14 9 19 9"/>
      <line x1="7" y1="13" x2="15" y2="13"/>
      <line x1="7" y1="17" x2="13" y2="17"/>
    </svg>
  ),
  comissoes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1-1 2-2.5 2v1"/>
      <line x1="12" y1="15.5" x2="12" y2="15.5"/>
    </svg>
  ),
  faturas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

const VARIANT_CLASS: Record<KpiVariant, string> = {
  vouchers: styles.k_vouchers,
  comissoes: styles.k_comissoes,
  faturas: styles.k_faturas,
};

export default function KpiCard({ variant, label, value, valueSmall, sub }: KpiCardProps) {
  return (
    <div className={`${styles.kpi} ${VARIANT_CLASS[variant]}`}>
      <span className={styles.ico}>{ICONS[variant]}</span>
      <div className={styles.label}>{label}</div>
      <div className={styles.v}>
        {value}
        {valueSmall && <small>{valueSmall}</small>}
      </div>
      <div className={styles.sub} dangerouslySetInnerHTML={{ __html: sub }} />
    </div>
  );
}
