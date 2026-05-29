'use client';
import { useEffect } from 'react';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS, buildCoberturas } from '@/lib/types/cotacao';
import styles from './CompareModal.module.css';

const SABEMI_BADGE = (
  <svg width="140" height="40" viewBox="0 0 130 36" aria-label="Sabemi">
    <path d="M4 30 L18 6 L32 30 Z" fill="#004077"/>
    <text x="38" y="24" fontFamily="var(--font-sans)" fontSize="22" fontWeight="800" fill="#004077" letterSpacing="-0.5">Sabemi</text>
  </svg>
);

export default function CompareModal() {
  const { compareModalOpen, closeCompareModal, compared, ages } = useCotacaoStore();

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeCompareModal(); }
    if (compareModalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [compareModalOpen, closeCompareModal]);

  if (!compareModalOpen || compared.length < 2) return null;

  const plans = compared.map((i) => PLANS[i]);
  const allRows = plans.map((p) => buildCoberturas(p));
  const labelSet = new Set<string>();
  allRows.forEach((rows) => rows.forEach(([k]) => labelSet.add(k)));
  const labels = Array.from(labelSet);
  const cols = `repeat(${plans.length}, 1fr)`;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) closeCompareModal(); }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <header className={styles.modalHead}>
          <h2>Comparativo de planos</h2>
          <button type="button" className={styles.closeBtn} aria-label="Fechar" onClick={closeCompareModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </header>
        <div className={styles.modalBody}>
          <div className={styles.compareSummary} style={{ gridTemplateColumns: cols }}>
            {plans.map((p) => (
              <div key={p.name} className={styles.csumCard}>
                <div className={styles.csumLogo}>{SABEMI_BADGE}</div>
                <div className={styles.csumName}>{p.name}</div>
                <div className={styles.priceRow}>
                  <span className={styles.tag}>Boleto / Pix</span>
                  <b>R$ {p.vista}</b>
                </div>
                <div className={`${styles.priceRow} ${styles.priceRowCartao}`}>
                  <span className={`${styles.tag} ${styles.tagGreen}`}>Cartão em até 10x</span>
                  <b>R$ {p.total}</b>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.comparePax} style={{ gridTemplateColumns: cols }}>
            {plans.map((p) => (
              <div key={p.name} className={styles.cpaxCard}>
                <div className={styles.cpaxTtl}>Preços por passageiro</div>
                {ages.map((age, i) => (
                  <div key={i}>
                    <div className={styles.paxLine}><b>Passageiro {String(i+1).padStart(2,'0')}</b>, idade: {age} anos</div>
                    <div className={styles.paxLine}>Total Boleto/Pix: R$ {p.vista}</div>
                    <div className={styles.paxLine}>Total Cartão: R$ {p.total}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.compareTableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Cobertura</th>
                  {plans.map((p) => <th key={p.name}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {labels.map((label) => (
                  <tr key={label}>
                    <td>{label}</td>
                    {plans.map((p, i) => {
                      const found = allRows[i].find(([k]) => k === label);
                      if (!found) return <td key={p.name} className={styles.nao}>Não</td>;
                      const val = found[1];
                      const isSim = val.toLowerCase() === 'incluso' || val.toLowerCase().includes('incluído');
                      return <td key={p.name} className={isSim ? styles.sim : ''}>{isSim ? val : <b>{val}</b>}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.compareActions}>
            <button type="button" className={styles.btn}>Baixar como PDF</button>
            <button type="button" className={styles.btn}>Enviar por e-mail</button>
          </div>
        </div>
      </div>
    </div>
  );
}
