import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CovCol from './CovCol';

const icon = <span data-testid="icon">ico</span>;

describe('CovCol', () => {
  it('renderiza variante standard com valor', () => {
    render(
      <CovCol
        variant="standard"
        icon={icon}
        title="Despesas Médicas e Hospitalares"
        value="15.000"
      />,
    );

    expect(screen.getByText('Despesas Médicas e Hospitalares')).toBeInTheDocument();
    expect(screen.getByText('R$ 15.000')).toBeInTheDocument();
  });

  it('renderiza variante covid com valor', () => {
    render(
      <CovCol
        variant="covid"
        icon={icon}
        title="Despesas Médicas e Hospitalares por COVID-19"
        value="15.000"
      />,
    );

    expect(screen.getByText('Despesas Médicas e Hospitalares por COVID-19')).toBeInTheDocument();
    expect(screen.getByText('R$ 15.000')).toBeInTheDocument();
  });

  it('renderiza variante outras com lista de itens', () => {
    render(
      <CovCol
        variant="outras"
        icon={icon}
        title="Outras Coberturas"
        iconColor="green"
        items={[
          { label: 'Despesas Farmacêuticas', value: 'R$ 500' },
          { label: 'Traslado Médico', value: 'R$ 10.000' },
        ]}
      />,
    );

    expect(screen.getByText('Outras Coberturas')).toBeInTheDocument();
    expect(screen.getByText('Despesas Farmacêuticas')).toBeInTheDocument();
    expect(screen.getByText('R$ 500')).toBeInTheDocument();
    expect(screen.getByText('Traslado Médico')).toBeInTheDocument();
    expect(screen.queryByText(/^R\$ 15/)).not.toBeInTheDocument();
  });
});
