import styles from './YtBadge.module.css';

export default function YtBadge() {
  return (
    <span className={styles.ytBadge}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </span>
  );
}
