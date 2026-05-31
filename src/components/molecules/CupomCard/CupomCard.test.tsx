import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CupomCard from './CupomCard';

describe('CupomCard', () => {
  it('renderiza título e campo de cupom', () => {
    render(<CupomCard onApply={vi.fn()} />);

    expect(screen.getByText('Cupom de desconto')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar cupom' })).toBeInTheDocument();
  });

  it('chama onApply com o código digitado ao submeter', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CupomCard onApply={onApply} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'DESC10');
    await user.click(screen.getByRole('button', { name: 'Aplicar cupom' }));

    expect(onApply).toHaveBeenCalledWith('DESC10');
  });
});
