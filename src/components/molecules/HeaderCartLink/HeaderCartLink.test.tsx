import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import HeaderCartLink from './HeaderCartLink';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS_MOCK } from '@/lib/mocks/plans';

describe('HeaderCartLink', () => {
  beforeEach(() => {
    useCotacaoStore.setState({
      selectedPlan: null,
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      ages: [33],
    });
  });

  it('renderiza link do carrinho', () => {
    render(<HeaderCartLink />);

    expect(screen.getByRole('link', { name: 'Carrinho' })).toHaveAttribute('href', '/carrinho');
  });

  it('exibe estado vazio no resumo', () => {
    render(<HeaderCartLink />);

    expect(screen.getByRole('region', { name: 'Resumo do carrinho' })).toHaveTextContent(
      'Nenhum plano selecionado.',
    );
    expect(screen.getByRole('link', { name: 'Fazer cotação' })).toHaveAttribute('href', '/cotacao');
  });

  it('exibe resumo com plano selecionado', () => {
    useCotacaoStore.setState({ selectedPlan: PLANS_MOCK[0] });

    render(<HeaderCartLink />);

    const summary = screen.getByRole('region', { name: 'Resumo do carrinho' });
    expect(summary).toHaveTextContent('Resumo da compra');
    expect(summary).toHaveTextContent(PLANS_MOCK[0].name);
    expect(summary).toHaveTextContent('Brasil');
    expect(summary).toHaveTextContent('06/07/2026 - 10/07/2026 (5 dias)');
    expect(screen.getByRole('link', { name: 'Ir para o carrinho' })).toHaveAttribute('href', '/carrinho');
  });

  it('persiste o plano selecionado no localStorage', () => {
    useCotacaoStore.getState().selectPlan(PLANS_MOCK[0]);

    const raw = localStorage.getItem('sabemi-cotacao-cart');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).state.selectedPlan).toEqual(PLANS_MOCK[0]);
  });
});
