'use client';
import { useState } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className={styles.cookie}>
      <div className={styles.inner}>
        <p>
          Nosso site utiliza cookies para te proporcionar uma melhor experiência. Ao acessar o site da Sabemi Seguros, você concorda com a nossa{' '}
          <a href="#">Política de Privacidade</a> e <a href="#">Cookies</a>.
        </p>
        <button onClick={() => setDismissed(true)}>CONCORDO</button>
      </div>
    </div>
  );
}
