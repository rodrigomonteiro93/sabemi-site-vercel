import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ResultMeta from './ResultMeta';

describe('ResultMeta', () => {
  it('exibe destino, datas, dias e passageiros', () => {
    render(
      <ResultMeta
        destination="Brasil"
        dateFrom="06/07/2026"
        dateTo="10/07/2026"
        days={5}
        pax={1}
        sortBy="Menor preço"
        onSortChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: /Planos para Brasil/i })).toBeInTheDocument();
    expect(screen.getByText(/06\/07\/2026 → 10\/07\/2026 · 5 dias · 1 passageiro$/)).toBeInTheDocument();
  });

  it('pluraliza passageiros quando pax > 1', () => {
    render(
      <ResultMeta
        destination="Chile"
        dateFrom="01/01/2026"
        dateTo="05/01/2026"
        days={4}
        pax={3}
        sortBy="Menor preço"
        onSortChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/3 passageiros/)).toBeInTheDocument();
  });

  it('dispara onSortChange ao alterar ordenação', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <ResultMeta
        destination="Brasil"
        dateFrom="06/07/2026"
        dateTo="10/07/2026"
        days={5}
        pax={1}
        sortBy="Menor preço"
        onSortChange={onSortChange}
      />,
    );

    await user.selectOptions(screen.getByRole('combobox'), 'Mais vendidos');

    expect(onSortChange).toHaveBeenCalledWith('Mais vendidos');
  });
});
