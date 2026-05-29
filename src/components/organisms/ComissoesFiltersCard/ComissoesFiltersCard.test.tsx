import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ComissoesFiltersCard from './ComissoesFiltersCard';

describe('ComissoesFiltersCard', () => {
  it('renderiza os 4 campos de filtro', () => {
    render(<ComissoesFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    expect(screen.getByText('Data início')).toBeInTheDocument();
    expect(screen.getByText('Data fim')).toBeInTheDocument();
    expect(screen.getByText('Emissor')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('toggle colapsa e expande o corpo do filtro', async () => {
    const user = userEvent.setup();
    const { container } = render(<ComissoesFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).not.toMatch(/collapsed/);
  });

  it('submit chama onFilter com os dados do formulário', async () => {
    const user = userEvent.setup();
    const onFilter = vi.fn();

    render(<ComissoesFiltersCard onFilter={onFilter} onClear={vi.fn()} />);

    const textInputs = screen.getAllByPlaceholderText('dd/mm/aaaa');
    await user.type(textInputs[0], '01/01/2026');
    await user.type(textInputs[1], '31/05/2026');
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'Agência Teste');
    await user.selectOptions(screen.getAllByRole('combobox')[1], 'liberada');
    await user.click(screen.getByRole('button', { name: 'Filtrar Dados' }));

    expect(onFilter).toHaveBeenCalledWith({
      dataInicio: '01/01/2026',
      dataFim: '31/05/2026',
      emissor: 'Agência Teste',
      status: 'liberada',
    });
  });

  it('limpar chama onClear', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<ComissoesFiltersCard onFilter={vi.fn()} onClear={onClear} />);

    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));
    expect(onClear).toHaveBeenCalled();
  });
});
