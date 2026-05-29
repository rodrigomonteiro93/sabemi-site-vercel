'use client';

import { useState } from 'react';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import PlanSummaryCard from '@/components/molecules/PlanSummaryCard';
import PaymentFormSection from '@/components/organisms/PaymentFormSection';
import CheckoutSidebar from '@/components/organisms/CheckoutSidebar';
import styles from './checkout.module.css';

/* Dados mockados — substituir por useCotacaoStore na Fase 5 */
const MOCK = {
  planTitle: 'SABEMI 15K BRASIL | 0 A 60 ANOS',
  conditionsHref: '#',
  note: '*O seguro não é válido para pessoas que já se encontram no destino da viagem.',
  infoCol1: [
    { label: 'Nome', value: 'Juliano da Silva Monteiro' },
    { label: 'E-mail', value: 'juliano@sabemi.com.br' },
  ],
  infoCol2: [
    { label: 'Período', value: <>01/07/2026 - 04/07/2026 <small>(4 dias)</small></> },
    {
      label: 'Valor',
      value: <>R$ 17,48 à vista<br /><small>R$ 18,40 no cartão</small></>,
      isPrice: true,
    },
  ],
  agencia: 'Agência Teste',
  pax: ['Juliano da Silva Monteiro', 'Maria Eduarda Monteiro'],
  valorCartao: 18.40,
  paxCount: 1,
  totalCartao: 'R$ 18,40',
  totalVista: 'R$ 17,48',
};

export default function CheckoutPageContent() {
  const [isMethodSelected, setIsMethodSelected] = useState(false);

  function handleFinalizar() {
    /* integração com API na Fase 5 */
  }

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Efetuar Pagamento</h1>

          <PlanSummaryCard
            planTitle={MOCK.planTitle}
            conditionsHref={MOCK.conditionsHref}
            note={MOCK.note}
            infoCol1={MOCK.infoCol1}
            infoCol2={MOCK.infoCol2}
          />

          <div className={styles.checkoutGrid}>
            <div className={styles.checkoutCol}>
              <PaymentFormSection
                agencia={MOCK.agencia}
                pax={MOCK.pax}
                valorCartao={MOCK.valorCartao}
                onMethodChange={m => setIsMethodSelected(!!m)}
              />
            </div>
            <CheckoutSidebar
              paxCount={MOCK.paxCount}
              totalCartao={MOCK.totalCartao}
              totalVista={MOCK.totalVista}
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
