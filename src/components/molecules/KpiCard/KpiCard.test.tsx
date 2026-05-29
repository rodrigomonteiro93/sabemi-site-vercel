import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KpiCard from './KpiCard';

describe('KpiCard', () => {
  it('renderiza label, value e sub corretamente', () => {
    render(
      <KpiCard
        variant="vouchers"
        label="Vouchers emitidos"
        value="38"
        sub="↑ <b>+12%</b> vs. período anterior"
      />,
    );

    expect(screen.getByText('Vouchers emitidos')).toBeInTheDocument();
    expect(screen.getByText('38')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renderiza valueSmall quando fornecido', () => {
    render(
      <KpiCard
        variant="comissoes"
        label="Total em comissões"
        value="R$ 2.143"
        valueSmall=",80"
        sub="23 lançamentos"
      />,
    );

    expect(screen.getByText(',80')).toBeInTheDocument();
  });

  it('aplica classe de variante correta', () => {
    const { container, rerender } = render(
      <KpiCard variant="vouchers" label="A" value="1" sub="sub" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/k_vouchers/);

    rerender(<KpiCard variant="comissoes" label="B" value="2" sub="sub" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/k_comissoes/);

    rerender(<KpiCard variant="faturas" label="C" value="3" sub="sub" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/k_faturas/);
  });
});
