import styles from './StepItem.module.css';

interface StepItemProps {
  icon: React.ReactNode;
  description: React.ReactNode;
}

export default function StepItem({ icon, description }: StepItemProps) {
  return (
    <div className={styles.step}>
      <span className={styles.ring}>{icon}</span>
      <p>{description}</p>
    </div>
  );
}
