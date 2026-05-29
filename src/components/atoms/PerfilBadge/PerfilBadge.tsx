import styles from './PerfilBadge.module.css';

interface PerfilBadgeProps {
  variant: 'emissor' | 'financeiro';
}

export default function PerfilBadge({ variant }: PerfilBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {variant === 'emissor' ? 'Emissor' : 'Financeiro'}
    </span>
  );
}
