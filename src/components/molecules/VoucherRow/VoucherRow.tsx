'use client';

import { useEffect, useRef, useState } from 'react';
import PaxAvatar from '@/components/atoms/PaxAvatar/PaxAvatar';
import StatusBadge from '@/components/atoms/StatusBadge/StatusBadge';
import { VoucherPageItem, computeTripMeta } from '@/lib/types/vouchers';
import styles from './VoucherRow.module.css';

interface VoucherRowProps {
  item: VoucherPageItem;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
  today: Date;
  onView: (id: number) => void;
  onDownload: (id: number) => void;
  onResend: (id: number) => void;
  onCancel: (id: number) => void;
}

function initials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
}

export default function VoucherRow({
  item, avatarColorIndex, today, onView, onDownload, onResend, onCancel,
}: VoucherRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const meta = computeTripMeta(item, today);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = () => setMenuOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [menuOpen]);

  const whenTagCls = {
    upcoming: styles.upcoming,
    ongoing: styles.ongoing,
    past: styles.past,
    cancel: styles.cancelTag,
  }[meta.cls];

  return (
    <div className={`${styles.vrow} ${styles.grid}`}>
      <div className={styles.client}>
        <PaxAvatar initials={initials(item.nome)} colorIndex={avatarColorIndex} />
        <div className={styles.clientInfo}>
          <div className={styles.name} title={item.nome}>{item.nome}</div>
          <div className={styles.vid}>Voucher #{item.id}</div>
        </div>
      </div>

      <div className={styles.dest}>
        <div className={styles.nameDest} title={item.destino}>{item.destino}</div>
        <div className={styles.days}>{item.dias} dia{item.dias > 1 ? 's' : ''} de viagem</div>
      </div>

      <div className={styles.dates}>
        <div className={styles.range}>
          <span className={styles.rangeLine}>De: {item.start}</span>
          <span className={styles.rangeLine}>Até: {item.end}</span>
        </div>
        <div className={`${styles.whenTag} ${whenTagCls}`}>{meta.label}</div>
      </div>

      <div className={styles.value}>
        <div className={styles.v}>{item.total}</div>
        {item.comissao !== null ? (
          <div className={styles.comm}>+{item.comissao} comissão</div>
        ) : (
          <div className={`${styles.comm} ${styles.commNone}`}>sem comissão</div>
        )}
      </div>

      <div className={styles.status}>
        <StatusBadge variant={item.status} />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.menuBtn}
          aria-label="Mais ações"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev); }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.6"/>
            <circle cx="12" cy="12" r="1.6"/>
            <circle cx="12" cy="19" r="1.6"/>
          </svg>
        </button>
        <div
          ref={menuRef}
          className={`${styles.menuPop} ${menuOpen ? styles.menuPopOpen : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className={styles.menuItem}
            onClick={() => { setMenuOpen(false); onView(item.id); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Visualizar detalhes
          </button>
          <button type="button" className={styles.menuItem}
            onClick={() => { setMenuOpen(false); onDownload(item.id); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Baixar voucher PDF
          </button>
          <button type="button" className={styles.menuItem}
            onClick={() => { setMenuOpen(false); onResend(item.id); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Reenviar por e-mail
          </button>
          <hr className={styles.menuDivider} />
          <button
            type="button"
            className={`${styles.menuItem} ${styles.menuDanger}`}
            disabled={item.status === 'cancel'}
            onClick={() => { setMenuOpen(false); onCancel(item.id); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            Cancelar voucher
          </button>
        </div>
      </div>
    </div>
  );
}
