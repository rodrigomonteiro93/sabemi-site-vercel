import styles from './CheckoutTotalsCard.module.css';

interface CupomDesconto {
  code: string;
  valor: string;
}

interface CheckoutTotalsCardProps {
  paxLabel: string;
  totalCartao: string;
  totalVista: string;
  desconto?: CupomDesconto;
}

export default function CheckoutTotalsCard({
  paxLabel,
  totalCartao,
  totalVista,
  desconto,
}: CheckoutTotalsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.k}>{paxLabel}</span>
        <span className={styles.v}>{totalCartao}</span>
      </div>
      {desconto && (
        <div className={styles.row}>
          <span className={styles.k}>Desconto ({desconto.code})</span>
          <span className={styles.vDiscount}>{desconto.valor}</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.k}>Valor total</span>
        <span className={styles.v}>{totalVista}</span>
      </div>
    </div>
  );
}
