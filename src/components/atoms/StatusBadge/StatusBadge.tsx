import styles from './StatusBadge.module.css';

type StatusBadgeVariant =
  | 'cancel' | 'emit' | 'pendente'
  | 'liberada' | 'aguardando' | 'bloqueada'
  | 'recebida' | 'vencida' | 'aberta' | 'processando';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
}

const LABELS: Record<StatusBadgeVariant, string> = {
  cancel: 'Cancelado',
  emit: 'Emitido',
  pendente: 'Aguardando pagto',
  liberada: 'Liberada',
  aguardando: 'Aguardando',
  bloqueada: 'Bloqueada',
  recebida: 'Recebida',
  vencida: 'Vencida',
  aberta: 'Aberta',
  processando: 'Processando',
};

export default function StatusBadge({ variant }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {LABELS[variant]}
    </span>
  );
}
