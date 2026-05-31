import styles from './CheckoutTotalsCard.module.css';

interface CheckoutTotalsCardProps {
  paxLabel: string;
  totalCartao: string;
  totalVista: string;
}

export default function CheckoutTotalsCard({
  paxLabel,
  totalCartao,
  totalVista,
}: CheckoutTotalsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.k}>{paxLabel}</span>
        <span className={styles.v}>{totalCartao}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.k}>Valor total</span>
        <span className={styles.v}>{totalVista}</span>
      </div>
    </div>
  );
}
