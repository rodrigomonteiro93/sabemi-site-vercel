'use client';

import StatusBadge from '@/components/atoms/StatusBadge';
import IconButton from '@/components/atoms/IconButton';
import { FinanceiroItem, fmtBRL, fmtDate } from '@/lib/types/financeiro';
import styles from './FaturaRow.module.css';

interface FaturaRowProps {
  item: FinanceiroItem;
  onView: (id: number) => void;
  onBoleto: (id: number) => void;
}

export default function FaturaRow({ item, onView, onBoleto }: FaturaRowProps) {
  const isLate = item.status === 'vencida';

  const dueLabel = item.status === 'recebida'
    ? `Paga em ${fmtDate(item.venc)}`
    : isLate
      ? `Venceu em ${fmtDate(item.venc)}`
      : `Vence em ${fmtDate(item.venc)}`;

  return (
    <div className={styles.row}>
      <div className={styles.when}>
        <div className={styles.id}>Fatura #{item.id}</div>
        <div className={styles.date}>{item.date}</div>
      </div>

      <div>
        <StatusBadge variant={item.status} />
      </div>

      <div className={styles.group}>
        <div className={styles.gv}>{fmtBRL(item.totalPedidos)}</div>
        <div className={styles.gqty}>
          <b>{item.qPedidos}</b> pedido{item.qPedidos > 1 ? 's' : ''}
        </div>
      </div>

      <div className={`${styles.group} ${styles.isCom}`}>
        <div className={styles.gv}>{fmtBRL(item.totalComissoes)}</div>
        <div className={styles.gqty}>
          <b>{item.qComissoes}</b> comiss{item.qComissoes !== 1 ? 'ões' : 'ão'}
        </div>
      </div>

      <div className={styles.total}>
        <div className={styles.tv}>{fmtBRL(item.total)}</div>
        <div className={`${styles.tdue} ${isLate ? styles.dueLate : ''}`}>{dueLabel}</div>
      </div>

      <div className={styles.boletoCell}>
        {item.hasBoleto && item.status !== 'recebida' ? (
          <button
            className={styles.btnBoleto}
            type="button"
            onClick={() => onBoleto(item.id)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="12" rx="1"/>
              <line x1="7" y1="6" x2="7" y2="18"/>
              <line x1="11" y1="6" x2="11" y2="18"/>
              <line x1="15" y1="6" x2="15" y2="18"/>
              <line x1="19" y1="6" x2="19" y2="18"/>
            </svg>
            2ª via
          </button>
        ) : item.status === 'recebida' ? (
          <span className={styles.noBoleto}>comprovante</span>
        ) : (
          <span className={styles.noBoleto}>—</span>
        )}
      </div>

      <div className={styles.actions}>
        <IconButton
          ariaLabel="Ver detalhes"
          onClick={() => onView(item.id)}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
