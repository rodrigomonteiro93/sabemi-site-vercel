import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import CompareBar from './CompareBar';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

describe('CompareBar', () => {
  beforeEach(() => {
    useCotacaoStore.setState({ compared: [], compareModalOpen: false });
  });

  it('não renderiza com 0 planos selecionados', () => {
    render(<CompareBar />);

    expect(screen.queryByText(/planos selecionados/i)).not.toBeInTheDocument();
  });

  it('não renderiza com 1 plano selecionado', () => {
    useCotacaoStore.setState({ compared: [0] });
    render(<CompareBar />);

    expect(screen.queryByText(/planos selecionados/i)).not.toBeInTheDocument();
  });

  it('renderiza com 2 ou mais planos selecionados', () => {
    useCotacaoStore.setState({ compared: [0, 1] });
    render(<CompareBar />);

    expect(screen.getByText('2 planos selecionados')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Comparar planos selecionados/i })).toBeInTheDocument();
  });

  it('limpa seleção ao clicar em Limpar', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ compared: [0, 1, 2] });
    render(<CompareBar />);

    await user.click(screen.getByRole('button', { name: 'Limpar' }));

    expect(useCotacaoStore.getState().compared).toEqual([]);
    expect(screen.queryByText(/planos selecionados/i)).not.toBeInTheDocument();
  });
});
