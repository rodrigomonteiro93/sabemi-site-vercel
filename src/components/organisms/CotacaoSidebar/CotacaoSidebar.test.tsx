import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import CotacaoSidebar from './CotacaoSidebar';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

describe('CotacaoSidebar', () => {
  beforeEach(() => {
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
});
