import styles from './CardIconsGroup.module.css';

export default function CardIconsGroup() {
  return (
    <div className={styles.group} aria-hidden="true">
      <span className={`${styles.ci} ${styles.visa}`}>VISA</span>
      <span className={`${styles.ci} ${styles.mc}`}>MC</span>
      <span className={`${styles.ci} ${styles.amex}`}>AMEX</span>
      <span className={`${styles.ci} ${styles.elo}`}>ELO</span>
      <span className={`${styles.ci} ${styles.hiper}`}>HIPER</span>
    </div>
  );
}
