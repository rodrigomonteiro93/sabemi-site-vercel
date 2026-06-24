import styles from './IconButton.module.css';

interface IconButtonProps {
  ariaLabel: string;
  children: React.ReactNode;
  hasDot?: boolean;
  href?: string;
  onClick?: () => void;
}

export default function IconButton({ ariaLabel, children, hasDot, href, onClick }: IconButtonProps) {
  const className = styles.iconBtn;

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
        {hasDot && <span className={styles.dot} />}
      </a>
    );
  }

  return (
    <button className={className} aria-label={ariaLabel} onClick={onClick} type="button">
      {children}
      {hasDot && <span className={styles.dot} />}
    </button>
  );
}
