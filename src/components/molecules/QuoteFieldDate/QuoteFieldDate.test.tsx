import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuoteFieldDate from './QuoteFieldDate';

describe('QuoteFieldDate', () => {
  it('renderiza label, dia e mês/ano', () => {
    render(
      <QuoteFieldDate
        label="Data de Partida"
        day="26"
        monthYear="Maio 2026"
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByText('Data de Partida')).toBeInTheDocument();
    expect(screen.getByText('26')).toBeInTheDocument();
    expect(screen.getByText('Maio 2026')).toBeInTheDocument();
  });

  it('dispara onClick ao clicar no campo', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <QuoteFieldDate label="Ida" day="01" monthYear="Jul 2026" onClick={onClick} />,
    );

    await user.click(screen.getByText('Ida').closest('div')!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
