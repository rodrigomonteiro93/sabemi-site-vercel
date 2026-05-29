import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PerfilBadge from './PerfilBadge';

describe('PerfilBadge', () => {
  it('renderiza "Emissor" com variant emissor', () => {
    render(<PerfilBadge variant="emissor" />);
    const badge = screen.getByText('Emissor');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/emissor/);
  });

  it('renderiza "Financeiro" com variant financeiro', () => {
    render(<PerfilBadge variant="financeiro" />);
    const badge = screen.getByText('Financeiro');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/financeiro/);
  });

  it('aplica classe CSS correta por variant', () => {
    const { rerender } = render(<PerfilBadge variant="emissor" />);
    expect(screen.getByText('Emissor').className).toMatch(/emissor/);

    rerender(<PerfilBadge variant="financeiro" />);
    expect(screen.getByText('Financeiro').className).toMatch(/financeiro/);
  });
});
