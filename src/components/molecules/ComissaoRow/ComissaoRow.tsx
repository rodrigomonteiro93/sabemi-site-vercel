import PaxAvatar from '@/components/atoms/PaxAvatar';
import StatusBadge from '@/components/atoms/StatusBadge';
import { ComissaoItem } from '@/lib/types/comissoes';
import styles from './ComissaoRow.module.css';

interface ComissaoRowProps {
  item: ComissaoItem;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0])
    .join('')
    .toUpperCase();
}

export default function ComissaoRow({ item, avatarColorIndex }: ComissaoRowProps) {
  return (
    <div className={`${styles.crow} ${styles.crowGrid}`}>
      <div className={styles.vk}>
        <div className={styles.vid}>#{item.id}</div>
        <div className={styles.date}>{item.date}</div>
      </div>
      <div className={styles.emissor} title={item.emissor}>{item.emissor}</div>
      <div className={styles.pax}>
        <PaxAvatar initials={getInitials(item.paxName)} colorIndex={avatarColorIndex} />
        <div className={styles.info}>
          <div className={styles.name}>{item.paxName}</div>
          <div className={styles.doc}>{item.paxDoc}</div>
        </div>
      </div>
      <div className={styles.com}>
        <div className={styles.comV}>{item.comValue}</div>
        <div className={styles.pct}>{item.comPct} comissão</div>
      </div>
      <div className={styles.net}>{item.netValue}</div>
      <div>
        <StatusBadge variant={item.status} />
      </div>
    </div>
  );
}
