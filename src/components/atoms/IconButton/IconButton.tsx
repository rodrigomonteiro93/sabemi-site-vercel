import styles from './IconButton.module.css';

interface IconButtonProps {
  ariaLabel: string;
  children: React.ReactNode;
  hasDot?: boolean;
  onClick?: () => void;
}

export default function IconButton({ ariaLabel, children, hasDot, onClick }: IconButtonProps) {
  return (
    <button className={styles.iconBtn} aria-label={ariaLabel} onClick={onClick}>
      {children}
      {hasDot && <span className={styles.dot} />}
    </button>
  );
}
