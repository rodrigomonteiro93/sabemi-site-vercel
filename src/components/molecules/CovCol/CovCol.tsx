import styles from './CovCol.module.css';

interface CovColOtherItem {
  label: string;
  value: string;
}

interface CovColProps {
  variant: 'standard' | 'covid' | 'outras';
  icon: React.ReactNode;
  title: string;
  value?: string;
  items?: CovColOtherItem[];
  iconColor?: 'red' | 'green';
}

export default function CovCol({ variant, icon, title, value, items, iconColor = 'red' }: CovColProps) {
  return (
    <div className={`${styles.covCol} ${variant === 'outras' ? styles.outras : ''}`}>
      <span className={`${styles.ico} ${iconColor === 'green' ? styles.icoGreen : ''}`}>{icon}</span>
      <span className={styles.ttl}>{title}</span>
      {variant !== 'outras' && value && <span className={styles.val}>R$ {value}</span>}
      {variant === 'outras' && items && (
        <ul className={styles.outrasList}>
          {items.map(({ label, value: v }) => (
            <li key={label} className={styles.outrasItem}>
              <span>{label}</span>
              <b>{v}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
