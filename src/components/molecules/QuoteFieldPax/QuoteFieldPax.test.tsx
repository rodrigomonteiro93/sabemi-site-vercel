import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuoteFieldPax from './QuoteFieldPax';

describe('QuoteFieldPax', () => {
  it('exibe count de passageiros', () => {
    render(
      <QuoteFieldPax count={3} onIncrement={vi.fn()} onDecrement={vi.fn()} atMax={false} />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Nº Passageiros')).toBeInTheDocument();
  });

  it('chama onIncrement e onDecrement', async () => {
    const user = userEvent.setup();
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();

    render(
      <QuoteFieldPax count={2} onIncrement={onIncrement} onDecrement={onDecrement} atMax={false} />,
    );

    await user.click(screen.getByRole('button', { name: 'Aumentar' }));
    expect(onIncrement).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Diminuir' }));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('desabilita incremento quando atMax', () => {
    render(
      <QuoteFieldPax count={10} onIncrement={vi.fn()} onDecrement={vi.fn()} atMax />,
    );
    expect(screen.getByRole('button', { name: 'Aumentar' })).toBeDisabled();
  });

  it('desabilita decremento quando count é 0', () => {
    render(
      <QuoteFieldPax count={0} onIncrement={vi.fn()} onDecrement={vi.fn()} atMax={false} />,
    );
    expect(screen.getByRole('button', { name: 'Diminuir' })).toBeDisabled();
  });
});
