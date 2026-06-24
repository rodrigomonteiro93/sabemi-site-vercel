'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import Button from '@/components/atoms/Button';
import PaxSection from '@/components/organisms/PaxSection';
import CartResumoCard from '@/components/molecules/CartResumoCard';
import CancelPrazoCard from '@/components/molecules/CancelPrazoCard';
import TermsCheckbox from '@/components/molecules/TermsCheckbox';
import { getTotalsWithCupom } from '@/lib/mocks/cupons';
import styles from './page.module.css';

const DAYS = 5;

function formatCurrency(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function createPaxKeys(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `pax-${i}`);
}

function CarrinhoEmptyState() {
  return (
    <>
      <SiteHeader />

      <main className={`${styles.page} ${styles.pageEmpty}`}>
        <div className={styles.container}>
          <div className={styles.emptyWrap}>
            <div className={styles.emptyIllustration} aria-hidden="true">
              <div className={styles.emptyIconRing}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>
              </div>
            </div>

            <h1 className={styles.emptyHeading}>Seu carrinho está vazio</h1>
            <p className={styles.emptyLead}>
              Nenhum plano foi selecionado. Faça uma cotação, compare as opções e escolha a cobertura ideal para sua viagem.
            </p>

            <div className={styles.emptyCard}>
              <p className={styles.emptyCardLabel}>Como começar</p>
              <ol className={styles.emptySteps}>
                <li className={styles.emptyStep}>
                  <span className={styles.emptyStepNum}>1</span>
                  <span className={styles.emptyStepText}>
                    <strong>Faça sua cotação</strong>
                    <span>Informe destino, datas e passageiros</span>
                  </span>
                </li>
                <li className={styles.emptyStep}>
                  <span className={styles.emptyStepNum}>2</span>
                  <span className={styles.emptyStepText}>
                    <strong>Compare os planos</strong>
                    <span>Veja coberturas, preços e benefícios</span>
                  </span>
                </li>
                <li className={styles.emptyStep}>
                  <span className={styles.emptyStepNum}>3</span>
                  <span className={styles.emptyStepText}>
                    <strong>Contrate online</strong>
                    <span>Clique em &quot;Contratar plano&quot; e finalize aqui</span>
                  </span>
                </li>
              </ol>

              <div className={styles.emptyActions}>
                <Button variant="primary" href={ROUTES.cotacao}>
                  Fazer cotação
                </Button>
                <Button variant="outline" href={ROUTES.home}>
                  Voltar ao início
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}

function CarrinhoWithPlan() {
  const router = useRouter();
  const {
    destino, ida, retorno, tipo, ages, selectedPlan, removeAge,
    paxData, setPaxData, removePaxData, syncPaxDataLength, appliedCupom,
  } = useCotacaoStore();

  const planName = selectedPlan!.name;
  const ageRange = '0 a 60 anos';
  const priceVista = selectedPlan!.vista;
  const priceTotal = selectedPlan!.total;
  const motivo_ = tipo ?? 'Lazer / Turismo / Negócios';
  const destino_ = destino ?? 'Brasil';
  const periodo = ida && retorno
    ? `${ida} - ${retorno} (${DAYS} dias)`
    : '06/07/2026 - 10/07/2026 (5 dias)';
  const paxCount = ages.length > 0 ? ages.length : 4;
  const canRemovePax = ages.length > 1;

  const [paxKeys, setPaxKeys] = useState<string[]>(() => createPaxKeys(paxCount));
  const [collapsed, setCollapsed] = useState<boolean[]>(() =>
    Array.from({ length: paxCount }, (_, i) => i > 0)
  );
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    syncPaxDataLength(paxCount);
  }, [paxCount, syncPaxDataLength]);

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
    if (ages.length <= 1) return;

    removeAge(i);
    removePaxData(i);
    setCollapsed((prev) => prev.filter((_, idx) => idx !== i));
    setPaxKeys((prev) => prev.filter((_, idx) => idx !== i));
  }

  function minimize(i: number) {
    setCollapsed((prev) => prev.map((c, idx) => (idx === i ? true : c)));
    const el = document.getElementById(`pax-${i + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const activePaxCount = ages.length > 0 ? ages.length : paxKeys.length;
  const baseVista = formatCurrency(parseFloat(priceVista.replace(',', '.')) * activePaxCount);
  const base10x = formatCurrency(parseFloat(priceTotal.replace(',', '.')) * activePaxCount);
  const totals = getTotalsWithCupom(baseVista, base10x, appliedCupom);

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Coberturas Selecionadas</h1>

          {paxKeys.map((paxKey, i) => (
            <div key={paxKey} id={`pax-${i + 1}`}>
              <PaxSection
                index={i + 1}
                total={activePaxCount}
                isCollapsed={collapsed[i]}
                planName={planName}
                ageRange={ageRange}
                priceVista={priceVista}
                motivo={motivo_}
                destino={destino_}
                periodo={periodo}
                canRemove={canRemovePax}
                onToggle={() => toggleCollapsed(i)}
                onRemove={() => removePax(i)}
                onMinimize={() => minimize(i)}
                onSaveAndNext={i < paxKeys.length - 1 ? () => saveAndNext(i) : undefined}
                initialData={paxData[i]}
                onSaveDraft={(data) => setPaxData(i, data)}
              />
            </div>
          ))}

          <CartResumoCard
            totalVista={totals.totalVista}
            total10x={totals.totalCartao}
            desconto={totals.desconto}
          />
          <CancelPrazoCard />

          <TermsCheckbox checked={acceptTerms} onChange={setAcceptTerms} />

          <div className={styles.payWrap}>
            <button
              className={`${styles.btnPay} ${!acceptTerms ? styles.disabled : ''}`}
              disabled={!acceptTerms}
              onClick={() => { if (acceptTerms) router.push(ROUTES.checkout); }}
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

export default function CarrinhoContent() {
  const selectedPlan = useCotacaoStore((s) => s.selectedPlan);
  const [hydrated, setHydrated] = useState(() => useCotacaoStore.persist.hasHydrated());

  useEffect(() => {
    if (useCotacaoStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useCotacaoStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return null;
  }

  if (!selectedPlan) {
    return <CarrinhoEmptyState />;
  }

  return <CarrinhoWithPlan />;
}
