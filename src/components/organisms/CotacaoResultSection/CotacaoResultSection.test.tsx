import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CotacaoResultSection from './CotacaoResultSection';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS } from '@/lib/types/cotacao';

describe('CotacaoResultSection', () => {
  beforeEach(() => {
    useCotacaoStore.setState({
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      sortBy: 'Menor preço',
      plans: PLANS,
      compared: [],
      markupHidden: false,
    });
  });

  it('renderiza meta de resultados e lista de planos', () => {
    render(<CotacaoResultSection />);

    expect(screen.getByRole('heading', { name: /Planos para Brasil/i })).toBeInTheDocument();
    expect(screen.getByText(PLANS[0].name)).toBeInTheDocument();
    expect(screen.getByText(PLANS[PLANS.length - 1].name)).toBeInTheDocument();
  });

  it('exibe select de ordenação', () => {
    render(<CotacaoResultSection />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
