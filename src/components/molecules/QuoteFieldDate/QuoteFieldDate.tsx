import styles from './QuoteFieldDate.module.css';

interface QuoteFieldDateProps {
  label: string;
  day: string;
  monthYear: string;
  onClick: () => void;
}

export default function QuoteFieldDate({ label, day, monthYear, onClick }: QuoteFieldDateProps) {
  return (
    <div className={[styles.qfield, styles.hasCal].join(' ')} onClick={onClick}>
      <div className={styles.col}>
        <label>{label}</label>
        <span className={styles.value}>
          <strong>{day}</strong>{monthYear}
        </span>
      </div>
      <span className={styles.chev}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>
    </div>
  );
}
