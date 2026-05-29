'use client';

import PaxAvatar from '@/components/atoms/PaxAvatar';
import PerfilBadge from '@/components/atoms/PerfilBadge';
import Switch from '@/components/atoms/Switch';
import { EmissorItem } from '@/lib/types/emissores';
import styles from './EmissorRow.module.css';

interface EmissorRowProps {
  item: EmissorItem;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleAtivo: (id: number) => void;
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0])
    .join('')
    .toUpperCase();
}

export default function EmissorRow({ item, avatarColorIndex, onEdit, onDelete, onToggleAtivo }: EmissorRowProps) {
  const comissaoText = item.comissao === null
    ? 'N/F (padrão)'
    : `${item.comissao.toFixed(2).replace('.', ',')}%`;

  const [dataDate, dataTime] = item.data.split(' ');

  return (
    <div className={`${styles.erow} ${styles.erowGrid}`}>
      <div className={styles.emissor}>
        <PaxAvatar initials={initials(item.nome)} colorIndex={avatarColorIndex} />
        <div className={styles.info}>
          <div className={styles.name}>{item.nome}</div>
          <div className={styles.doc}>CPF {item.cpf}</div>
        </div>
      </div>

      <div className={styles.contact}>
        <div className={styles.email} title={item.email}>{item.email}</div>
        <div className={styles.tel}>{item.tel}</div>
      </div>

      <div>
        <PerfilBadge variant={item.perfil} />
      </div>

      <div className={`${styles.comCell} ${item.comissao === null ? styles.none : ''}`}>
        {comissaoText}
      </div>

      <div>
        <Switch
          checked={item.ativo}
          onChange={() => onToggleAtivo(item.id)}
          id={`ativo-${item.id}`}
        />
      </div>

      <div className={styles.dataCell}>
        {dataDate}
        <div className={styles.dataHora}>{dataTime}</div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btnEdit}
          type="button"
          onClick={() => onEdit(item.id)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Editar
        </button>
        <button
          className={styles.btnDel}
          type="button"
          aria-label="Excluir"
          title="Excluir"
          onClick={() => onDelete(item.id)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
