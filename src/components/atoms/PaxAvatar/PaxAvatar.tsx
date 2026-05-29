import styles from './PaxAvatar.module.css';

interface PaxAvatarProps {
  initials: string;
  colorIndex: 1 | 2 | 3 | 4 | 5;
}

export default function PaxAvatar({ initials, colorIndex }: PaxAvatarProps) {
  return (
    <span className={`${styles.avatar} ${styles[`a${colorIndex}`]}`}>
      {initials}
    </span>
  );
}
