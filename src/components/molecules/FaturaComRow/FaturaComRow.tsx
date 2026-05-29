'use client';

import PaxAvatar from '@/components/atoms/PaxAvatar';
import type { FaturaComissaoItem } from '@/lib/types/financeiro';
import styles from './FaturaComRow.module.css';

interface FaturaComRowProps {
  item: FaturaComissaoItem;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export default function FaturaComRow({ item, avatarColorIndex }: FaturaComRowProps) {
  return (
    <div className={styles.crow}>
      <div className={styles.voucherId}>#{item.id}</div>
      <div className={styles.plano} title={item.plano}>{item.plano}</div>
      <div className={styles.pax}>
        <PaxAvatar initials={initials(item.cliente)} colorIndex={avatarColorIndex} />
        <div className={styles.paxInfo}>
          <div className={styles.name}>{item.cliente}</div>
          <div className={styles.cpf}>CPF {item.cpf}</div>
        </div>
      </div>
      <div className={styles.emissor} title={item.emissor}>{item.emissor}</div>
      <div className={styles.com}>
        <div className={styles.comV}>{item.comissao}</div>
        <div className={styles.comPct}>{item.comissaoPct}</div>
      </div>
      <div className={styles.net}>{item.net}</div>
    </div>
  );
}
