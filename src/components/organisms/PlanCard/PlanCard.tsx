'use client';
import CovCol from '@/components/molecules/CovCol/CovCol';
import { CotacaoPlan } from '@/lib/types/cotacao';
import styles from './PlanCard.module.css';

const SABEMI_BADGE = (
  <svg width="92" height="30" viewBox="0 0 130 36" aria-label="Sabemi">
    <path d="M4 30 L18 6 L32 30 Z" fill="#004077"/>
    <text x="38" y="24" fontFamily="Mulish, sans-serif" fontSize="22" fontWeight="800" fill="#004077" letterSpacing="-0.5">Sabemi</text>
  </svg>
);

interface PlanCardProps {
  plan: CotacaoPlan;
  index: number;
  passageiros: number;
  dias: number;
  isCompared: boolean;
  markupHidden: boolean;
  onToggleCompare: (idx: number) => void;
  onOpenEmail: (idx: number) => void;
  onOpenCobertura: (idx: number) => void;
}

export default function PlanCard({
  plan, index, passageiros, dias, isCompared, markupHidden,
  onToggleCompare, onOpenEmail, onOpenCobertura,
}: PlanCardProps) {
  const bagCol = plan.cov ? (
    <CovCol
      variant="covid"
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/>
            <line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>
            <line x1="5.6" y1="5.6" x2="7.7" y2="7.7"/><line x1="16.3" y1="16.3" x2="18.4" y2="18.4"/>
            <line x1="5.6" y1="18.4" x2="7.7" y2="16.3"/><line x1="16.3" y1="7.7" x2="18.4" y2="5.6"/>
          </g>
        </svg>
      }
      title="Despesas Médicas e Hospitalares por COVID-19"
      value={plan.bagCov}
    />
  ) : (
    <CovCol
      variant="standard"
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7h3zm2-2v2h8V5H8z"/>
        </svg>
      }
      title="Extravio de Bagagem"
      value={plan.bag ?? undefined}
    />
  );

  return (
    <article className={styles.plan}>
      <div className={styles.planMain}>
        <div className={styles.planHead}>
          <span className={styles.planHeadName}>{plan.name}</span>
          <span className={styles.planHeadBrand}>{SABEMI_BADGE}</span>
        </div>
        <div className={styles.planBody}>
          <CovCol
            variant="standard"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3v6h6v6h-6v6h-4v-6H4V9h6V3h4z"/>
              </svg>
            }
            title="Despesas Médicas e Hospitalares"
            value={plan.med}
          />
          {bagCol}
          <CovCol
            variant="outras"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="8 12.5 11 15.5 16 9.5"/>
              </svg>
            }
            title="Outras Coberturas"
            iconColor="green"
            items={plan.others.map(([label, value]) => ({ label, value }))}
          />
        </div>
        <div className={styles.planActions}>
          <label className={`${styles.pillAct} ${isCompared ? styles.pillActChecked : ''}`}>
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(index)}
            />
            Comparar
          </label>
          <button className={styles.pillAct} type="button" onClick={() => onOpenEmail(index)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Enviar por e-mail
          </button>
          <button className={styles.pillAct} type="button" onClick={() => onOpenCobertura(index)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Coberturas
          </button>
          <div className={styles.comissoes} style={{ visibility: markupHidden ? 'hidden' : 'visible' }}>
            <div className={styles.comissoesHead}>Comissões</div>
            <div className={styles.comissoesRow}>Cartão: <b>R$ {plan.comCard}</b></div>
            <div className={styles.comissoesRow}>Boleto / PIX: <b>R$ {plan.comBoleto}</b></div>
          </div>
        </div>
      </div>
      <aside className={styles.planSide}>
        <div>
          <div className={styles.priceMeta}>
            Preço total para <b>{passageiros} pessoa(s)</b><br />
            e <b>{dias} dia(s)</b>
          </div>
          <div className={styles.priceParcel}>R$ {plan.total}</div>
          <div className={styles.priceJuros}>em até 10x sem juros</div>
          <div className={styles.priceVista} style={{ marginTop: 8 }}>
            ou <b>R$ {plan.vista}</b> à vista
          </div>
        </div>
        <button
          className={styles.btnContratar}
          onClick={() => { window.location.href = '/carrinho'; }}
        >
          Contratar plano
        </button>
      </aside>
    </article>
  );
}
