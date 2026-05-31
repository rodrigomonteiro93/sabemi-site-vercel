import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CheckoutTotalsCard from './CheckoutTotalsCard';

describe('CheckoutTotalsCard', () => {
  it('exibe paxLabel, totalCartao e totalVista', () => {
    render(
      <CheckoutTotalsCard
        paxLabel="1 Passageiro(s)"
        totalCartao="R$ 18,40"
        totalVista="R$ 17,48"
      />,
    );

    expect(screen.getByText('1 Passageiro(s)')).toBeInTheDocument();
    expect(screen.getByText('R$ 18,40')).toBeInTheDocument();
    expect(screen.getByText('Valor total')).toBeInTheDocument();
    expect(screen.getByText('R$ 17,48')).toBeInTheDocument();
  });
});
