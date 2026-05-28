import styles from './QuoteFieldPax.module.css';

interface QuoteFieldPaxProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  atMax: boolean;
}

export default function QuoteFieldPax({ count, onIncrement, onDecrement, atMax }: QuoteFieldPaxProps) {
  return (
    <div className={[styles.qfield, atMax ? styles.atMax : ''].join(' ')}>
      <div className={styles.col}>
        <label>Nº Passageiros</label>
        <span className={styles.value}>{count}</span>
      </div>
      <span className={styles.numControls}>
        <button type="button" aria-label="Aumentar" onClick={onIncrement} disabled={atMax}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
        <button type="button" aria-label="Diminuir" onClick={onDecrement} disabled={count === 0}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </span>
    </div>
  );
}
