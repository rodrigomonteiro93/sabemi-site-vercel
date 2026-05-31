import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CotacaoResultSection from './CotacaoResultSection';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS_MOCK } from '@/lib/mocks/plans';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('CotacaoResultSection', () => {
  beforeEach(() => {
    push.mockClear();
    useCotacaoStore.setState({
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      coberturas: '',
      ages: [33],
      sortBy: 'Menor preço',
      plans: PLANS_MOCK,
      compared: [],
      markupHidden: false,
    });
  });

  it('renderiza meta de resultados e lista de planos', () => {
    render(<CotacaoResultSection />);

    expect(screen.getByRole('heading', { name: /Planos para Brasil/i })).toBeInTheDocument();
    expect(screen.getByText(PLANS_MOCK[0].name)).toBeInTheDocument();
    expect(screen.getByText(PLANS_MOCK[PLANS_MOCK.length - 1].name)).toBeInTheDocument();
  });

  it('exibe select de ordenação', () => {
    render(<CotacaoResultSection />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('atualiza URL ao mudar ordenação', async () => {
    const user = userEvent.setup();
    render(<CotacaoResultSection />);

    await user.selectOptions(screen.getByRole('combobox'), 'Maior cobertura médica');

    expect(push).toHaveBeenCalledWith(
      expect.stringContaining('ordenar=Maior+cobertura+m'),
    );
  });
});
