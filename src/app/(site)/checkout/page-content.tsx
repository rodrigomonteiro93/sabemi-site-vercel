'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import PlanSummaryCard from '@/components/molecules/PlanSummaryCard';
import PaymentFormSection from '@/components/organisms/PaymentFormSection';
import CheckoutSidebar from '@/components/organisms/CheckoutSidebar';
import { AGE_RANGE, TRIP_DAYS, buildPaxDisplayNames, getCartTotals } from '@/lib/cotacao/cartPricing';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './checkout.module.css';

const AGENCIA_MOCK = 'Agência Teste';
const PLAN_NOTE = '*O seguro não é válido para pessoas que já se encontram no destino da viagem.';

function CheckoutEmptyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.carrinho);
  }, [router]);

  return null;
}

function CheckoutWithPlan() {
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const router = useRouter();
  const { selectedPlan, destino, ida, retorno, tipo, ages, paxData } = useCotacaoStore();

  const plan = selectedPlan!;
  const paxCount = ages.length > 0 ? ages.length : 1;
  const { totalVista, totalCartao, valorCartao } = getCartTotals(plan.vista, plan.total, paxCount);
  const pax = buildPaxDisplayNames(paxData, paxCount);
  const primeiroPax = paxData[0];
  const periodo = ida && retorno
    ? `${ida} - ${retorno}`
    : '06/07/2026 - 10/07/2026';

  function handleFinalizar() {
    const callbackUrl = encodeURIComponent(ROUTES.vouchers);
    router.push(`${ROUTES.login}?callbackUrl=${callbackUrl}`);
  }

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Efetuar Pagamento</h1>

          <PlanSummaryCard
            planTitle={`${plan.name.toUpperCase()} | ${AGE_RANGE}`}
            conditionsHref={ROUTES.coberturas}
            note={PLAN_NOTE}
            infoCol1={
              primeiroPax?.nome && primeiroPax?.email
                ? [
                    { label: 'Nome', value: primeiroPax.nome },
                    { label: 'E-mail', value: primeiroPax.email },
                  ]
                : [
                    { label: 'Destino', value: destino ?? 'Brasil' },
                    { label: 'Tipo de viagem', value: tipo ?? 'Lazer / Turismo / Negócios' },
                  ]
            }
            infoCol2={[
              {
                label: 'Período',
                value: <>{periodo} <small>({TRIP_DAYS} dias)</small></>,
              },
              {
                label: 'Valor',
                value: <>{totalVista} à vista<br /><small>{totalCartao} no cartão</small></>,
                isPrice: true,
              },
            ]}
          />

          <div className={styles.checkoutGrid}>
            <div className={styles.checkoutCol}>
              <PaymentFormSection
                agencia={AGENCIA_MOCK}
                pax={pax}
                valorCartao={valorCartao}
                onMethodChange={(m) => setIsMethodSelected(!!m)}
              />
            </div>
            <CheckoutSidebar
              paxCount={paxCount}
              totalCartao={totalCartao}
              totalVista={totalVista}
              isMethodSelected={isMethodSelected}
              onFinalizar={handleFinalizar}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}

export default function CheckoutPageContent() {
  const selectedPlan = useCotacaoStore((s) => s.selectedPlan);

  if (!selectedPlan) {
    return <CheckoutEmptyRedirect />;
  }

  return <CheckoutWithPlan />;
}
