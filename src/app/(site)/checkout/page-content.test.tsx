import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CheckoutPageContent from './page-content';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS_MOCK } from '@/lib/mocks/plans';
import { ROUTES } from '@/lib/navigation/siteRoutes';

const replace = vi.fn();
const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push }),
  usePathname: () => '/checkout',
}));

describe('CheckoutPageContent', () => {
  beforeEach(() => {
    replace.mockClear();
    push.mockClear();
    useCotacaoStore.setState({
      selectedPlan: null,
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      ages: [33, 50],
      paxData: [],
    });
  });

  it('redireciona para o carrinho sem plano selecionado', () => {
    render(<CheckoutPageContent />);

    expect(replace).toHaveBeenCalledWith(ROUTES.carrinho);
    expect(screen.queryByRole('heading', { name: 'Efetuar Pagamento' })).not.toBeInTheDocument();
  });

  it('exibe dados do carrinho no checkout', () => {
    useCotacaoStore.setState({ selectedPlan: PLANS_MOCK[0] });

    render(<CheckoutPageContent />);

    const main = screen.getByRole('main');

    expect(within(main).getByRole('heading', { name: 'Efetuar Pagamento' })).toBeInTheDocument();
    expect(within(main).getByText('SABEMI 15K BRASIL | 0 a 60 anos')).toBeInTheDocument();
    expect(within(main).getByText('Brasil')).toBeInTheDocument();
    expect(within(main).getByText('Lazer / Turismo / Negócios')).toBeInTheDocument();
    expect(within(main).getByText(/06\/07\/2026 - 10\/07\/2026/)).toBeInTheDocument();
    expect(within(main).getByText('2 Passageiro(s)')).toBeInTheDocument();
    expect(within(main).getByText('R$ 43,70')).toBeInTheDocument();
    expect(within(main).getByText('R$ 46,00')).toBeInTheDocument();
  });

  it('exibe nome do passageiro salvo no carrinho', () => {
    useCotacaoStore.setState({
      selectedPlan: PLANS_MOCK[0],
      ages: [33],
      paxData: [{ nome: 'Maria Silva', email: 'maria@test.com' }],
    });

    render(<CheckoutPageContent />);

    const main = screen.getByRole('main');
    expect(within(main).getByText('Maria Silva')).toBeInTheDocument();
    expect(within(main).getByText('maria@test.com')).toBeInTheDocument();
  });
});
