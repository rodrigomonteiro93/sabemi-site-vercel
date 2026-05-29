import styles from './CartResumoCard.module.css';

interface CartResumoCardProps {
  totalVista: string;
  total10x: string;
}

export default function CartResumoCard({ totalVista, total10x }: CartResumoCardProps) {
  return (
    <div className={styles.resumo}>
      <div className={styles.head}>Resumo da compra</div>
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
