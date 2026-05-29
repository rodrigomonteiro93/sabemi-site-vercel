import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'outline' | 'white' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  variant,
  children,
  onClick,
  href,
  disabled,
  type = 'button',
  className,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');
  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
