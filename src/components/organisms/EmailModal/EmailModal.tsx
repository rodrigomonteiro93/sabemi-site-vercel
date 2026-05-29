'use client';
import { useEffect, useState } from 'react';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './EmailModal.module.css';

export default function EmailModal() {
  const { emailModalOpen, closeEmailModal } = useCotacaoStore();
  const [nome, setNome] = useState('Agência Teste');
  const [email, setEmail] = useState('julianodesenv@gmail.com');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeEmailModal(); }
    if (emailModalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      setSent(false);
    }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [emailModalOpen, closeEmailModal]);

  if (!emailModalOpen) return null;

  function handleSend() {
    if (!nome.trim() || !email.trim()) return;
    setSent(true);
    setTimeout(() => { closeEmailModal(); }, 1200);
  }

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) closeEmailModal(); }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="emailModalTitle">
        <button type="button" className={styles.emailClose} aria-label="Fechar" onClick={closeEmailModal}>×</button>
        <div className={styles.body}>
          <h2 id="emailModalTitle">Qual e-mail deseja receber?</h2>
          <div className={styles.field}>
            <label htmlFor="emailNome">Nome</label>
            <input type="text" id="emailNome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label htmlFor="emailEmail">E-mail</label>
            <input type="email" id="emailEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button
            type="button"
            className={styles.btnEnviar}
            onClick={handleSend}
            disabled={sent}
            style={sent ? { background: 'var(--success)' } : undefined}
          >
            {sent ? 'Enviado ✓' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}
