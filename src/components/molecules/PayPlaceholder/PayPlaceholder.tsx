import styles from './PayPlaceholder.module.css';

interface PayPlaceholderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function PayPlaceholder({ icon, title, description }: PayPlaceholderProps) {
  return (
    <div className={styles.container}>
      <span className={styles.ico}>{icon}</span>
      <div className={styles.ttl}>{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  );
}
