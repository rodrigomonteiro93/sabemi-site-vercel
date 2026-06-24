'use client';

import { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './LoginLink.module.css';

const UserIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function LoginLink() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data: { authenticated?: boolean }) => {
        if (!cancelled) {
          setAuthenticated(Boolean(data.authenticated));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthenticated(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isLoggedIn = authenticated === true;
  const href = isLoggedIn ? ROUTES.dashboard : ROUTES.login;
  const label = isLoggedIn ? 'Minha Conta' : 'Login';

  return (
    <a href={href} className={styles.loginLink}>
      {authenticated !== null ? label : <span className={styles.srOnly}>Login</span>}
      <span className={styles.userCircle} aria-hidden="true">
        <UserIcon />
      </span>
    </a>
  );
}
