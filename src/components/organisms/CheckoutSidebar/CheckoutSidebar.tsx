'use client';

import { useState } from 'react';
import CupomCard from '@/components/molecules/CupomCard';
import CheckoutTotalsCard from '@/components/molecules/CheckoutTotalsCard';
import SecureBadge from '@/components/atoms/SecureBadge';
import {
  getCupomSuccessMessage,
  getTotalsWithCupom,
  resolveCupom,
} from '@/lib/mocks/cupons';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './CheckoutSidebar.module.css';

interface CheckoutSidebarProps {
  paxCount: number;
  totalCartao: string;
  totalVista: string;
  isMethodSelected: boolean;
  onFinalizar: () => void;
}

export default function CheckoutSidebar({
  paxCount,
  totalCartao,
  totalVista,
  isMethodSelected,
  onFinalizar,
}: CheckoutSidebarProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [cupomMessage, setCupomMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const appliedCupom = useCotacaoStore((s) => s.appliedCupom);
  const setAppliedCupom = useCotacaoStore((s) => s.setAppliedCupom);

  const totals = getTotalsWithCupom(totalVista, totalCartao, appliedCupom);

  function handleApplyCupom(code: string) {
    const cupom = resolveCupom(code);

    if (!cupom) {
      setAppliedCupom(null);
      setCupomMessage({ text: 'Cupom inválido ou expirado.', type: 'error' });
      return;
    }

    setAppliedCupom(cupom);
    setCupomMessage({ text: getCupomSuccessMessage(cupom), type: 'success' });
  }

  function handleFinalizar() {
    if (!isMethodSelected) return;
    setStatus('processing');
    onFinalizar();
    setTimeout(() => setStatus('done'), 1000);
  }

  const btnLabel =
    status === 'processing' ? 'Processando...' :
    status === 'done' ? 'Pagamento confirmado ✓' :
    'Finalizar compra';

  return (
    <aside>
      <CupomCard onApply={handleApplyCupom} defaultCode={appliedCupom?.code} />
      {cupomMessage && (
        <p
          className={[
            styles.cupomMsg,
            cupomMessage.type === 'success' ? styles.cupomMsgSuccess : styles.cupomMsgError,
          ].join(' ')}
        >
          {cupomMessage.text}
        </p>
      )}
      {!cupomMessage && appliedCupom && (
        <p className={[styles.cupomMsg, styles.cupomMsgSuccess].join(' ')}>
          {getCupomSuccessMessage(appliedCupom)}
        </p>
      )}
      <CheckoutTotalsCard
        paxLabel={`${paxCount} Passageiro(s)`}
        totalCartao={totals.totalCartao}
        totalVista={totals.totalVista}
        desconto={totals.desconto}
      />
      <div className={styles.finalizarWrap}>
        <button
          className={styles.btnFinalizar}
          disabled={!isMethodSelected || status !== 'idle'}
          onClick={handleFinalizar}
          style={status === 'done' ? { background: 'var(--success)' } : undefined}
        >
          {btnLabel}
        </button>
        <SecureBadge />
      </div>
    </aside>
  );
}
