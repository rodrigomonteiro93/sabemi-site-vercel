'use client';

import { useState, type FormEvent } from 'react';
import { subscribeNewsletter } from '@/lib/api/newsletter-client';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './FooterNewsletter.module.css';

export default function FooterNewsletter() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nome.trim() || !email.trim()) return;

    setStatus('loading');

    try {
      await subscribeNewsletter({ nome: nome.trim(), email: email.trim() });
      setStatus('success');
    } catch {
      setStatus('idle');
      return;
    }
    setNome('');
    setEmail('');
  }

  return (
    <div className={styles.footNewsletter}>
      <h4>Receba novidades em seu e-mail</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Escreva seu nome *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={[styles.row, styles.rowEmail].join(' ')}>
          <input
            type="email"
            placeholder="email@sabemi.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Inscrito ✓' : 'Inscrever'}
          </button>
        </div>
      </form>
      <p className={styles.consent}>
        Ao informar seu e-mail, você concorda em receber comunicações da Sabemi e está de acordo com nossa{' '}
        <a href={ROUTES.politicaPrivacidade}>Política de Privacidade</a>.
      </p>
    </div>
  );
}
