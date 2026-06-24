'use client';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import { useEffect } from 'react';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { buildCoberturas } from '@/lib/types/cotacao';
import styles from './CoberturaModal.module.css';

const SABEMI_BADGE_LG = (
  <svg width="120" height="38" viewBox="0 0 130 36" aria-label="Sabemi">
    <path d="M4 30 L18 6 L32 30 Z" fill="#004077"/>
    <text x="38" y="24" fontFamily="var(--font-sans)" fontSize="22" fontWeight="800" fill="#004077" letterSpacing="-0.5">Sabemi</text>
  </svg>
);

export default function CoberturaModal() {
  const { covModalOpen, covModalPlanIdx, closeCovModal, plans } = useCotacaoStore();

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeCovModal(); }
    if (covModalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [covModalOpen, closeCovModal]);

  if (!covModalOpen || covModalPlanIdx === null) return null;
  const plan = plans[covModalPlanIdx];
  if (!plan) return null;
  const rows = buildCoberturas(plan);

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) closeCovModal(); }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="covModalTitle">
        <header className={styles.modalHead}>
          <h2 id="covModalTitle">Coberturas do plano</h2>
          <button type="button" className={styles.closeBtn} aria-label="Fechar" onClick={closeCovModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </header>
        <div className={styles.modalPlanBar}>{plan.name.toUpperCase()}</div>
        <div className={styles.modalBrandRow}>
          <span className={styles.brandLogo}>{SABEMI_BADGE_LG}</span>
          <span className={styles.seg}>Seguradora: <b>Sabemi Seguradora</b></span>
          <a href={ROUTES.termosDeUso} className={styles.pdf} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM7 14h2v1.5H7V17h2v1.5H7V20H5.5v-7H7v1zm5 6h-2v-7h2c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2zm6-5h-2v1.5h2V18h-2v2h-1.5v-7H18v2zm-6 .5v3h-.5v-3h.5z"/>
            </svg>
            Condições Gerais
          </a>
        </div>
        <div className={styles.modalBody}>
          <table className={styles.covTable}>
            <thead>
              <tr>
                <th>Coberturas*</th>
                <th>Limite máximo de cobertura*</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.modalFoot}>
          <a href={ROUTES.termosDeUso} target="_blank" rel="noopener noreferrer">Condições Gerais</a>
        </div>
      </div>
    </div>
  );
}
