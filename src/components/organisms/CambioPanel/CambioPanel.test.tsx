import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CambioPanel from './CambioPanel';

const defaultProps = {
  date: '27 de maio de 2026',
  pair: 'USD → BRL · Dólar comercial',
  currency: 'R$',
  value: '5,12',
  delta: '+ R$ 0,08 (1,59%) vs. ontem',
  deltaType: 'up' as const,
  updatedAt: 'Atualizado às 09:15 — fonte BCB · PTAX',
  histHref: '/historico',
};

describe('CambioPanel', () => {
  it('renderiza value, delta e pair corretamente', () => {
    render(<CambioPanel {...defaultProps} />);

    expect(screen.getByText('USD → BRL · Dólar comercial')).toBeInTheDocument();
    expect(screen.getByText('5,12')).toBeInTheDocument();
    expect(screen.getByText('+ R$ 0,08 (1,59%) vs. ontem')).toBeInTheDocument();
  });

  it('aplica deltaDown quando deltaType === down', () => {
    const { container } = render(
      <CambioPanel {...defaultProps} deltaType="down" delta="- R$ 0,05 (0,98%) vs. ontem" />,
    );

    const delta = container.querySelector('[class*="delta"]');
    expect(delta?.className).toMatch(/deltaDown/);
  });
});
