import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renderiza variant primary', () => {
    render(<Button variant="primary">Entrar</Button>);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('renderiza variant outline e white', () => {
    const { rerender } = render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button', { name: 'Outline' })).toBeInTheDocument();

    rerender(<Button variant="white">White</Button>);
    expect(screen.getByRole('button', { name: 'White' })).toBeInTheDocument();
  });

  it('dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="primary" onClick={onClick}>Clique</Button>);

    await user.click(screen.getByRole('button', { name: 'Clique' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza como link quando href é fornecido', () => {
    render(<Button variant="primary" href="/cotacao">Cotar</Button>);
    const link = screen.getByRole('link', { name: 'Cotar' });
    expect(link).toHaveAttribute('href', '/cotacao');
  });

  it('fica desabilitado quando disabled', () => {
    render(<Button variant="primary" disabled>Ok</Button>);
    expect(screen.getByRole('button', { name: 'Ok' })).toBeDisabled();
  });
});
