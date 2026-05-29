import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('renderiza com aria-label e children', () => {
    render(
      <IconButton ariaLabel="Carrinho">
        <span>icon</span>
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Carrinho' })).toBeInTheDocument();
  });

  it('renderiza dot quando hasDot', () => {
    const { container } = render(
      <IconButton ariaLabel="Carrinho" hasDot>
        <span>icon</span>
      </IconButton>,
    );
    expect(container.querySelector('span[class*="dot"]')).toBeTruthy();
  });

  it('dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton ariaLabel="Ação" onClick={onClick}>
        <span>icon</span>
      </IconButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Ação' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
