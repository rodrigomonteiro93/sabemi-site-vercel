'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import styles from './CancelModal.module.css';

interface CancelModalProps {
  isOpen: boolean;
  title: string;
  alertText: ReactNode;
  subjectText: ReactNode;
  reasonOptions: string[];
  onClose: () => void;
  onSubmit: (reason: string, obs: string) => void;
}

export default function CancelModal({
  isOpen,
  title,
  alertText,
  subjectText,
  reasonOptions,
  onClose,
  onSubmit,
}: CancelModalProps) {
  const [reason, setReason] = useState('');
  const [obs, setObs] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClose = useCallback(() => {
    setReason('');
    setObs('');
    setLoading(false);
    setSent(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  const handleSubmit = () => {
    if (!reason) {
      alert('Selecione um motivo.');
      return;
    }
    if (!obs.trim()) {
      alert('Descreva o motivo no campo de observações.');
      return;
    }
    setLoading(true);
    onSubmit(reason, obs);
    setTimeout(() => {
      setSent(true);
      setTimeout(handleClose, 900);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <h2>{title}</h2>
          <button className={styles.close} type="button" onClick={handleClose} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalAlert}>
            <span className={styles.alertIco}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <div>{alertText}</div>
          </div>
          <div className={styles.modalSubject}>{subjectText}</div>

          <div className={styles.fieldReason}>
            <label htmlFor="cancel-reason">Motivo do cancelamento *</label>
            <select
              id="cancel-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Selecione um motivo</option>
              {reasonOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.fieldTextarea}>
            <label htmlFor="cancel-obs">Descrição / observações *</label>
            <textarea
              id="cancel-obs"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Detalhe o motivo do cancelamento para que a equipe Sabemi possa analisar..."
            />
          </div>

          <div className={styles.modalActions}>
            <button className={styles.btnCancelModal} type="button" onClick={handleClose}>
              Voltar
            </button>
            <button
              className={styles.btnConfirmDanger}
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={sent ? { background: 'var(--success)' } : undefined}
            >
              {sent ? 'Solicitação enviada ✓' : loading ? 'Enviando...' : 'Solicitar cancelamento'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
