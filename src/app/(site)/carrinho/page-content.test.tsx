import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CarrinhoContent from './page-content';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS_MOCK } from '@/lib/mocks/plans';

vi.mock('next/navigation', () => ({
  usePathname: () => '/carrinho',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('CarrinhoContent', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useCotacaoStore.setState({
      ages: [33, 45, 50],
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      selectedPlan: PLANS_MOCK[0],
      paxData: [],
    });
  });

  it('exibe estado vazio quando não há plano selecionado', () => {
    useCotacaoStore.setState({ selectedPlan: null });

    render(<CarrinhoContent />);

    const main = screen.getByRole('main');

    expect(within(main).getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument();
    expect(within(main).getByText(/Nenhum plano foi selecionado/i)).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: 'Fazer cotação' })).toHaveAttribute('href', '/cotacao');
    expect(within(main).getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/');
    expect(within(main).queryByText('Resumo da compra')).not.toBeInTheDocument();
    expect(within(main).queryByRole('button', { name: 'Efetuar pagamento' })).not.toBeInTheDocument();
  });

  it('não exibe estado vazio antes da hidratação do store', () => {
    vi.spyOn(useCotacaoStore.persist, 'hasHydrated').mockReturnValue(false);
    useCotacaoStore.setState({ selectedPlan: null });

    const { container } = render(<CarrinhoContent />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Seu carrinho está vazio')).not.toBeInTheDocument();
  });

  it('remove passageiro do carrinho e atualiza o store', async () => {
    const user = userEvent.setup();

    render(<CarrinhoContent />);

    const main = screen.getByRole('main');

    expect(screen.getAllByRole('button', { name: 'Remover' })).toHaveLength(3);
    expect(within(main).getByText('R$ 65,55')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: 'Remover' })[1]);

    expect(screen.getAllByRole('button', { name: 'Remover' })).toHaveLength(2);
    expect(useCotacaoStore.getState().ages).toEqual([33, 50]);
    expect(within(main).getByText('R$ 43,70')).toBeInTheDocument();
  });

  it('não exibe botão remover quando há apenas um passageiro', () => {
    useCotacaoStore.setState({ ages: [33], paxData: [{}] });

    render(<CarrinhoContent />);

    expect(screen.queryByRole('button', { name: 'Remover' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Inserir informações do passageiro 1' }),
    ).toBeInTheDocument();
  });

  it('persiste dados do passageiro no store ao preencher o formulário', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ ages: [33], paxData: [{}] });

    render(<CarrinhoContent />);

    await user.type(screen.getByLabelText(/Nome Completo/i), 'Maria Silva');
    await user.type(screen.getByLabelText('E-mail *'), 'maria@test.com');

    expect(useCotacaoStore.getState().paxData[0]?.nome).toBe('Maria Silva');
    expect(useCotacaoStore.getState().paxData[0]?.email).toBe('maria@test.com');
  });

  it('exibe desconto salvo no resumo do carrinho', () => {
    useCotacaoStore.setState({
      ages: [33],
      paxData: [{}],
      appliedCupom: { code: 'DESC10', percent: 10, label: '10% de desconto' },
    });

    render(<CarrinhoContent />);

    const main = screen.getByRole('main');
    expect(within(main).getByText('Desconto (DESC10)')).toBeInTheDocument();
    expect(within(main).getByText('- R$ 2,18')).toBeInTheDocument();
    expect(within(main).getByText('R$ 19,67')).toBeInTheDocument();
  });
});
