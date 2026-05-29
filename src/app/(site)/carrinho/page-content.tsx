'use client';

import { useState } from 'react';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import PaxSection from '@/components/organisms/PaxSection';
import CartResumoCard from '@/components/molecules/CartResumoCard';
import CancelPrazoCard from '@/components/molecules/CancelPrazoCard';
import TermsCheckbox from '@/components/molecules/TermsCheckbox';
import styles from './page.module.css';

const DAYS = 5;

function formatCurrency(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

export default function CarrinhoContent() {
  const { destino, ida, retorno, tipo, ages, plans } = useCotacaoStore();

  const selectedPlan = plans[0];
  const planName = selectedPlan?.name ?? 'SABEMI 15K BRASIL';
  const ageRange = '0 a 60 anos';
  const priceVista = selectedPlan?.vista ?? '21,85';
  const priceTotal = selectedPlan?.total ?? '23,00';
  const motivo_ = tipo ?? 'Lazer / Turismo / Negócios';
  const destino_ = destino ?? 'Brasil';
  const periodo = ida && retorno
    ? `${ida} - ${retorno} (${DAYS} dias)`
    : '06/07/2026 - 10/07/2026 (5 dias)';
  const paxCount = ages.length > 0 ? ages.length : 4;

  const [collapsed, setCollapsed] = useState<boolean[]>(() =>
    Array.from({ length: paxCount }, (_, i) => i > 0)
  );
  const [acceptTerms, setAcceptTerms] = useState(false);

  function toggleCollapsed(i: number) {
    setCollapsed((prev) => prev.map((c, idx) => (idx === i ? !c : c)));
  }

  function saveAndNext(i: number) {
    setCollapsed((prev) =>
      prev.map((c, idx) => (idx === i ? true : idx === i + 1 ? false : c))
    );
    const nextEl = document.getElementById(`pax-${i + 2}`);
    if (nextEl) {
      setTimeout(() => nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  function removePax(i: number) {
    setCollapsed((prev) => prev.filter((_, idx) => idx !== i));
  }

  function minimize(i: number) {
    setCollapsed((prev) => prev.map((c, idx) => (idx === i ? true : c)));
    const el = document.getElementById(`pax-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const totalVista = formatCurrency(parseFloat(priceVista.replace(',', '.')) * collapsed.length);
  const total10x = formatCurrency(parseFloat(priceTotal.replace(',', '.')) * collapsed.length);

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Coberturas Selecionadas</h1>

          {collapsed.map((isCollapsed, i) => (
            <div key={i} id={`pax-${i + 1}`}>
              <PaxSection
                index={i + 1}
                total={collapsed.length}
                isCollapsed={isCollapsed}
                planName={planName}
                ageRange={ageRange}
                priceVista={priceVista}
                motivo={motivo_}
                destino={destino_}
                periodo={periodo}
                onToggle={() => toggleCollapsed(i)}
                onRemove={() => removePax(i)}
                onMinimize={() => minimize(i)}
                onSaveAndNext={i < collapsed.length - 1 ? () => saveAndNext(i) : undefined}
              />
            </div>
          ))}

          <CartResumoCard totalVista={totalVista} total10x={total10x} />
          <CancelPrazoCard />

          <TermsCheckbox checked={acceptTerms} onChange={setAcceptTerms} />

          <div className={styles.payWrap}>
            <button
              className={`${styles.btnPay} ${!acceptTerms ? styles.disabled : ''}`}
              disabled={!acceptTerms}
              onClick={() => { if (acceptTerms) window.location.href = '/checkout'; }}
            >
              Efetuar pagamento
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
