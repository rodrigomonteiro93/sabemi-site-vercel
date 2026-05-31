import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PlanSummaryCard from './PlanSummaryCard';

const defaultProps = {
  planTitle: 'SABEMI 15K BRASIL | 0 A 60 ANOS',
  conditionsHref: '/condicoes.pdf',
  note: '*O seguro não é válido para pessoas que já se encontram no destino da viagem.',
  infoCol1: [
    { label: 'Nome', value: 'Juliano da Silva Monteiro' },
    { label: 'E-mail', value: 'juliano@sabemi.com.br' },
  ],
  infoCol2: [
    { label: 'Período', value: '01/07/2026 - 04/07/2026 (4 dias)' },
    { label: 'Valor', value: 'R$ 17,48 à vista', isPrice: true },
  ],
};

describe('PlanSummaryCard', () => {
  it('renderiza planTitle no cabeçalho', () => {
    render(<PlanSummaryCard {...defaultProps} />);

    expect(screen.getByText('SABEMI 15K BRASIL | 0 A 60 ANOS')).toBeInTheDocument();
  });

  it('renderiza todas as info-rows de infoCol1 e infoCol2', () => {
    render(<PlanSummaryCard {...defaultProps} />);

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Juliano da Silva Monteiro')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('juliano@sabemi.com.br')).toBeInTheDocument();
    expect(screen.getByText('Período')).toBeInTheDocument();
    expect(screen.getByText('01/07/2026 - 04/07/2026 (4 dias)')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('R$ 17,48 à vista')).toBeInTheDocument();
  });

  it('renderiza link de condições gerais e nota', () => {
    render(<PlanSummaryCard {...defaultProps} />);

    expect(screen.getByRole('link', { name: 'Condições Gerais' })).toHaveAttribute(
      'href',
      '/condicoes.pdf',
    );
    expect(screen.getByText(defaultProps.note)).toBeInTheDocument();
  });
});
