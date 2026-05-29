'use client';

import { useState } from 'react';
import styles from './CupomCard.module.css';

interface CupomCardProps {
  onApply: (code: string) => void;
}

export default function CupomCard({ onApply }: CupomCardProps) {
  const [code, setCode] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onApply(code);
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Cupom de desconto</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          className={styles.input}
        />
        <button type="submit" aria-label="Aplicar cupom" className={styles.btn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
