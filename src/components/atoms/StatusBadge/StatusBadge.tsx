import styles from './StatusBadge.module.css';

type StatusBadgeVariant = 'cancel' | 'emit' | 'pendente';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
}

const LABELS: Record<StatusBadgeVariant, string> = {
  cancel: 'Cancelado',
  emit: 'Emitido',
  pendente: 'Aguardando pagto',
};

export default function StatusBadge({ variant }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {LABELS[variant]}
    </span>
  );
}
