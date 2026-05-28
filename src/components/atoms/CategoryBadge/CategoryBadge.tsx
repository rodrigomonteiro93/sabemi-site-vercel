import styles from './CategoryBadge.module.css';

interface CategoryBadgeProps {
  variant: 'intl' | 'tur';
  children: React.ReactNode;
}

export default function CategoryBadge({ variant, children }: CategoryBadgeProps) {
  return (
    <span className={[styles.cat, styles[variant]].join(' ')}>{children}</span>
  );
}
