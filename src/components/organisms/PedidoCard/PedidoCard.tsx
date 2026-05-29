import StatusBadge from '@/components/atoms/StatusBadge/StatusBadge';
import InfoRow from '@/components/molecules/InfoRow/InfoRow';
import type { PedidoInfoItem } from '@/lib/types/pedidos';
import styles from './PedidoCard.module.css';

interface PedidoCardProps {
  pedidoId: string;
  heroTotalLabel: string;
  heroTotal: string;
  heroTotalSub: string;
  statusVariant: 'cancel' | 'emit' | 'pendente';
  statusSub: string;
  emitidoEm: string;
  infoItems: PedidoInfoItem[];
}

export default function PedidoCard({
  pedidoId,
  heroTotalLabel,
  heroTotal,
  heroTotalSub,
  statusVariant,
  statusSub,
  emitidoEm,
  infoItems,
}: PedidoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.headLeft}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="14 5 14 9 19 9"/>
          </svg>
          Pedido #{pedidoId}
        </span>
      </div>

      <div className={styles.orderHero}>
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
            <div className={styles.heroSub}>{statusSub}</div>
          </div>
        </div>
        <div className={styles.heroPill}>
          <span className={styles.pillK}>Emitido em</span>
          <span className={styles.pillV}>{emitidoEm}</span>
        </div>
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
