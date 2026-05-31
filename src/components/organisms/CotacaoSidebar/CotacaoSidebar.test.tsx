import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CotacaoSidebar from './CotacaoSidebar';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('CotacaoSidebar', () => {
  beforeEach(() => {
    push.mockClear();
    useCotacaoStore.setState({
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      ages: [33],
      markup: 30,
      markupHidden: false,
    });
  });

  it('renderiza formulário da viagem', () => {
    render(<CotacaoSidebar />);

    expect(screen.getByText('Sobre a viagem')).toBeInTheDocument();
    expect(screen.getByText('Copiar link')).toBeInTheDocument();
    expect(screen.getByText('Sala VIP')).toBeInTheDocument();
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveValue('Brasil');
    expect(screen.getByDisplayValue('06/07/2026')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('adiciona passageiro ao clicar em Mais', async () => {
    const user = userEvent.setup();
    render(<CotacaoSidebar />);

    expect(screen.getByText('Passageiro 1 (titular)')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mais' }));

    expect(useCotacaoStore.getState().ages).toHaveLength(2);
    expect(screen.getByText('Passageiro 2')).toBeInTheDocument();
  });

  it('navega para /cotacao com query params ao clicar em Buscar', async () => {
    const user = userEvent.setup();
    render(<CotacaoSidebar />);

    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(push).toHaveBeenCalledWith(
      expect.stringMatching(/ordenar=Menor\+pre/),
    );
    expect(push).toHaveBeenCalledWith(
      expect.stringContaining('destino=BR&ida=06-07-2026&retorno=10-07-2026&tipo=lazer&ages=33'),
    );
  });

  it('inclui coberturas na URL ao buscar com filtro selecionado', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ coberturas: 'Extravio de Bagagem' });
    render(<CotacaoSidebar />);

    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(push).toHaveBeenCalledWith(
      expect.stringContaining('coberturas=Extravio+de+Bagagem'),
    );
  });
});
