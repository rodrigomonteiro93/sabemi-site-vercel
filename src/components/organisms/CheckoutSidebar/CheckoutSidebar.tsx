'use client';

import { useState } from 'react';
import CupomCard from '@/components/molecules/CupomCard';
import CheckoutTotalsCard from '@/components/molecules/CheckoutTotalsCard';
import SecureBadge from '@/components/atoms/SecureBadge';
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
      <CupomCard onApply={() => {}} />
      <CheckoutTotalsCard
        paxLabel={`${paxCount} Passageiro(s)`}
        totalCartao={totalCartao}
        totalVista={totalVista}
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
