import styles from './CambioPanel.module.css';

interface CambioPanelProps {
  date: string;
  pair: string;
  currency: string;
  value: string;
  delta: string;
  deltaType: 'up' | 'down';
  updatedAt: string;
  histHref: string;
}

const ArrowUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function CambioPanel({
  date, pair, currency, value, delta, deltaType, updatedAt, histHref,
}: CambioPanelProps) {
  return (
    <div className={styles.cambioPanel}>
      <div className={styles.ttl}>Câmbio do dia</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.labelPair}>{pair}</div>
      <div className={styles.value}>
        <span className={styles.cur}>{currency}</span>{value}
      </div>
      <div className={`${styles.delta} ${deltaType === 'down' ? styles.deltaDown : ''}`}>
        {deltaType === 'up' ? <ArrowUp /> : <ArrowDown />}
        {delta}
      </div>
      <div className={styles.updated}>{updatedAt}</div>
      <a href={histHref} className={styles.histLink}>
        Histórico de câmbios
        <ArrowRight />
      </a>
    </div>
  );
}
