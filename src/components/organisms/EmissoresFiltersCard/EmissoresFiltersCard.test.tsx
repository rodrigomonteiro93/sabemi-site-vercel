import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmissoresFiltersCard from './EmissoresFiltersCard';

describe('EmissoresFiltersCard', () => {
  it('renderiza collapsed inicialmente com body oculto', () => {
    const { container } = render(<EmissoresFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/collapsed/);
    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument();
  });

  it('toggle abre e fecha o painel', async () => {
    const user = userEvent.setup();
    const { container } = render(<EmissoresFiltersCard onFilter={vi.fn()} onClear={vi.fn()} />);

    const card = container.firstChild as HTMLElement;
    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).not.toMatch(/collapsed/);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    expect(card.className).toMatch(/collapsed/);
  });

  it('onFilter chamado ao clicar Filtrar', async () => {
    const user = userEvent.setup();
    const onFilter = vi.fn();

    render(<EmissoresFiltersCard onFilter={onFilter} onClear={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    await user.type(screen.getByPlaceholderText('Buscar...'), 'João');
    await user.click(screen.getByRole('button', { name: 'Filtrar' }));

    expect(onFilter).toHaveBeenCalledWith({
      search: 'João',
      perfil: '',
      status: '',
      temComissao: '',
    });
  });

  it('onClear chamado ao clicar Limpar filtros', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<EmissoresFiltersCard onFilter={vi.fn()} onClear={onClear} />);

    await user.click(screen.getByRole('button', { name: /mostrar \/ ocultar/i }));
    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));
    expect(onClear).toHaveBeenCalled();
  });
});
