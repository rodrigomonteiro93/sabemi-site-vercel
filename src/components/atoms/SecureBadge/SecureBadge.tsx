import styles from './SecureBadge.module.css';

export default function SecureBadge() {
  return (
    <div className={styles.badge} aria-label="Compra segura">
      <span className={styles.lock}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="2"/>
          <path d="M8 11V8a4 4 0 0 1 8 0v3"/>
        </svg>
      </span>
      <span className={styles.t1}>100% Seguro</span>
      <span className={styles.t2}>Compra Segura<br />Qualidade Garantida</span>
    </div>
  );
}
