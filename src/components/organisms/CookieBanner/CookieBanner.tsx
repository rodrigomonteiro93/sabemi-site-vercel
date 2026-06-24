'use client';
import { useEffect, useState } from 'react';
import { hasCookieConsent, setCookieConsent } from '@/lib/cookies/consent';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasCookieConsent());
  }, []);

  function handleAccept() {
    setCookieConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.cookie}>
      <div className={styles.inner}>
        <p>
          Nosso site utiliza cookies para te proporcionar uma melhor experiência. Ao acessar o site da Sabemi Seguros, você concorda com a nossa{' '}
          <a href={ROUTES.politicaPrivacidade}>Política de Privacidade</a> e <a href={ROUTES.politicaCookies}>Cookies</a>.
        </p>
        <button type="button" onClick={handleAccept}>CONCORDO</button>
      </div>
    </div>
  );
}
