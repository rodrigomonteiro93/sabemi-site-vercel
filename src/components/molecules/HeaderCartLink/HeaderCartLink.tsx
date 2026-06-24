'use client';

import IconButton from '@/components/atoms/IconButton';
import { ROUTES } from '@/lib/navigation/siteRoutes';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './HeaderCartLink.module.css';

const TRIP_DAYS = 5;

function formatCurrency(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function parsePrice(value: string): number {
  return parseFloat(value.replace(',', '.'));
}

export default function HeaderCartLink() {
  const { selectedPlan, destino, ida, retorno, ages } = useCotacaoStore();

  const paxCount = ages.length > 0 ? ages.length : 1;
  const destinoLabel = destino ?? 'Brasil';
  const periodo = ida && retorno
    ? `${ida} - ${retorno} (${TRIP_DAYS} dias)`
    : '06/07/2026 - 10/07/2026 (5 dias)';

  const priceVista = selectedPlan?.vista ?? '21,85';
  const priceTotal = selectedPlan?.total ?? '23,00';
  const totalVista = formatCurrency(parsePrice(priceVista) * paxCount);
  const total10x = formatCurrency(parsePrice(priceTotal) * paxCount);

  return (
    <div className={styles.cartWrap}>
      <IconButton ariaLabel="Carrinho" href={ROUTES.carrinho} hasDot={!!selectedPlan}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
        </svg>
      </IconButton>

      <div className={styles.popover} role="region" aria-label="Resumo do carrinho">
        {selectedPlan ? (
          <div className={styles.panel}>
            <div className={styles.head}>Resumo da compra</div>
            <div className={styles.body}>
              <div className={styles.planName}>{selectedPlan.name}</div>
              <div className={styles.row}>
                <span className={styles.k}>Destino</span>
                <span className={styles.v}>{destinoLabel}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Período</span>
                <span className={styles.v}>{periodo}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Passageiros</span>
                <span className={styles.v}>{paxCount}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Total à vista</span>
                <span className={styles.price}>{totalVista}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Em até 10x</span>
                <span className={styles.price}>{total10x}</span>
              </div>
            </div>
            <a href={ROUTES.carrinho} className={styles.cta}>
              Ir para o carrinho
            </a>
          </div>
        ) : (
          <div className={styles.panel}>
            <div className={styles.head}>Seu carrinho</div>
            <p className={styles.empty}>Nenhum plano selecionado.</p>
            <a href={ROUTES.cotacao} className={styles.cta}>
              Fazer cotação
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
