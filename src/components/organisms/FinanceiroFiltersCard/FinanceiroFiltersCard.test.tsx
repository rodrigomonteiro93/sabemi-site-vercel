import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FinanceiroFiltersCard from './FinanceiroFiltersCard';

describe('FinanceiroFiltersCard', () => {
  it('renderiza os 5 campos de filtro', () => {
    render(<FinanceiroFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    expect(screen.getByText('Data início')).toBeInTheDocument();
    expect(screen.getByText('Data fim')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Valor mínimo')).toBeInTheDocument();
    expect(screen.getByText('Valor máximo')).toBeInTheDocument();
  });

  it('toggle collapse oculta e exibe filtersBody', async () => {
    const user = userEvent.setup();
    const { container } = render(<FinanceiroFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).not.toMatch(/collapsed/);
  });

  it('submit chama onFilter com os valores do formulário', async () => {
    const user = userEvent.setup();
    const onFilter = vi.fn();

    render(<FinanceiroFiltersCard onFilter={onFilter} onClear={vi.fn()} />);

    const textInputs = screen.getAllByPlaceholderText('dd/mm/aaaa');
    await user.type(textInputs[0], '01/01/2026');
    await user.type(textInputs[1], '31/05/2026');
    await user.selectOptions(screen.getByRole('combobox'), 'vencida');
    const valorInputs = screen.getAllByPlaceholderText('R$ 0,00');
    await user.type(valorInputs[0], '100');
    await user.type(valorInputs[1], '5000');
    await user.click(screen.getByRole('button', { name: 'Filtrar Faturas' }));

    expect(onFilter).toHaveBeenCalledWith({
      dataInicio: '01/01/2026',
      dataFim: '31/05/2026',
      status: 'vencida',
      valorMin: '100',
      valorMax: '5000',
    });
  });

  it('limpar filtros chama onClear e reseta o form', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<FinanceiroFiltersCard onFilter={vi.fn()} onClear={onClear} />);

    const textInputs = screen.getAllByPlaceholderText('dd/mm/aaaa');
    await user.type(textInputs[0], '01/01/2026');
    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));

    expect(onClear).toHaveBeenCalled();
    expect(textInputs[0]).toHaveValue('');
  });
});
