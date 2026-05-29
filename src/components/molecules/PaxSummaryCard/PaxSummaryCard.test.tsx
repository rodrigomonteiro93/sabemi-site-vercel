import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaxSummaryCard from './PaxSummaryCard';

const defaultProps = {
  planName: 'SABEMI 15K BRASIL',
  ageRange: '0 a 60 anos',
  priceVista: '21,85',
  motivo: 'Lazer / Turismo / Negócios',
  destino: 'Brasil',
  periodo: '06/07/2026 - 10/07/2026 (5 dias)',
};

describe('PaxSummaryCard', () => {
  it('renderiza logo, link de condições e aviso', () => {
    render(<PaxSummaryCard {...defaultProps} />);

    expect(screen.getByLabelText('Sabemi')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Condições gerais do seguro' })).toHaveAttribute('href', '#');
    expect(
      screen.getByText(/O seguro não é válido para pessoas que já se encontram no destino da viagem/),
    ).toBeInTheDocument();
  });

  it('exibe valor à vista, motivo, destino e período', () => {
    render(<PaxSummaryCard {...defaultProps} />);

    expect(screen.getByText('Valor à vista')).toBeInTheDocument();
    expect(screen.getByText('R$ 21,85')).toBeInTheDocument();
    expect(screen.getByText('Motivo')).toBeInTheDocument();
    expect(screen.getByText('Lazer / Turismo / Negócios')).toBeInTheDocument();
    expect(screen.getByText('Destino')).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('Período')).toBeInTheDocument();
    expect(screen.getByText('06/07/2026 - 10/07/2026 (5 dias)')).toBeInTheDocument();
  });
});
