import styles from './CartResumoCard.module.css';

interface CartResumoCardProps {
  totalVista: string;
  total10x: string;
  desconto?: {
    code: string;
    valor: string;
  };
}

export default function CartResumoCard({ totalVista, total10x, desconto }: CartResumoCardProps) {
  return (
    <div className={styles.resumo}>
      <div className={styles.head}>Resumo da compra</div>
      {desconto && (
        <div className={styles.row}>
          <span className={styles.k}>Desconto ({desconto.code})</span>
          <span className={styles.vDiscount}>{desconto.valor}</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.k}>Total à vista</span>
        <span className={styles.v}>{totalVista}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.k}>Total em até 10x sem juros</span>
        <span className={styles.v}>{total10x}</span>
      </div>
    </div>
  );
}
