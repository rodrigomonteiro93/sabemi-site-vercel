import styles from './LoginLink.module.css';

export default function LoginLink() {
  return (
    <a href="#" className={styles.loginLink}>
      Login
      <span className={styles.userCircle} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </span>
    </a>
  );
}
