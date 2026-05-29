'use client';

import StatusBadge from '@/components/atoms/StatusBadge';
import InfoRow from '@/components/molecules/InfoRow';
import type { FaturaData } from '@/lib/types/financeiro';
import styles from './FaturaCard.module.css';

interface FaturaCardProps extends Pick<FaturaData,
  | 'id' | 'heroTotalLabel' | 'heroTotal' | 'heroTotalSub'
  | 'statusVariant' | 'statusSub' | 'statusSubLate'
  | 'infoItems'
> {
  onBoleto: () => void;
}

export default function FaturaCard({
  id,
  heroTotalLabel,
  heroTotal,
  heroTotalSub,
  statusVariant,
  statusSub,
  statusSubLate,
  infoItems,
  onBoleto,
}: FaturaCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Fatura #{id}
      </div>

      <div className={styles.faturaHero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBlock}>
            <div className={styles.heroK}>{heroTotalLabel}</div>
            <div className={styles.heroV}>{heroTotal}</div>
            <div className={styles.heroSub}>{heroTotalSub}</div>
          </div>
          <div className={styles.heroSep} />
          <div className={styles.heroBlock}>
            <div className={styles.heroK}>Status</div>
            <StatusBadge variant={statusVariant} />
            <div className={`${styles.heroSub} ${statusSubLate ? styles.late : ''}`}>
              {statusSub}
            </div>
          </div>
        </div>
        <button className={styles.btnBoleto} type="button" onClick={onBoleto}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="12" rx="1"/>
            <line x1="7" y1="6" x2="7" y2="18"/>
            <line x1="11" y1="6" x2="11" y2="18"/>
            <line x1="15" y1="6" x2="15" y2="18"/>
            <line x1="19" y1="6" x2="19" y2="18"/>
          </svg>
          Visualizar boleto
        </button>
      </div>

      <div className={styles.infoGrid}>
        {infoItems.map((item, i) => (
          <InfoRow
            key={i}
            icon={item.icon}
            label={item.label}
            value={item.value}
            valueVariant={item.valueVariant}
          />
        ))}
      </div>
    </article>
  );
}
