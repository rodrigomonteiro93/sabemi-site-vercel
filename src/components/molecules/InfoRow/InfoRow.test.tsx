import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InfoRow from './InfoRow';

describe('InfoRow', () => {
  it('renderiza label, value e ícone', () => {
    render(
      <InfoRow
        icon={<span data-testid="icon">ico</span>}
        label="Data emissão"
        value="25/01/2026 06:00:09"
      />,
    );

    expect(screen.getByText('Data emissão')).toBeInTheDocument();
    expect(screen.getByText('25/01/2026 06:00:09')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('aplica classe danger quando valueVariant é danger', () => {
    render(
      <InfoRow
        icon={<span>ico</span>}
        label="Vencimento"
        value="04/02/2026"
        valueVariant="danger"
      />,
    );

    expect(screen.getByText('04/02/2026').className).toMatch(/danger/);
  });

  it('aplica classe mono quando valueVariant é mono', () => {
    render(
      <InfoRow
        icon={<span>ico</span>}
        label="Nota fiscal"
        value="NF-e 2026/00482"
        valueVariant="mono"
      />,
    );

    expect(screen.getByText('NF-e 2026/00482').className).toMatch(/mono/);
  });

  it('renderiza sem ícone quando icon é omitido, mantendo alinhamento na coluna 2', () => {
    render(<InfoRow label="CPF / CNPJ" value="29.581.218/0001-69" />);

    expect(screen.getByText('CPF / CNPJ')).toBeInTheDocument();
    expect(screen.getByText('29.581.218/0001-69')).toBeInTheDocument();
    expect(screen.getByText('CPF / CNPJ').className).toMatch(/k/);
    expect(screen.getByText('CPF / CNPJ').className).not.toMatch(/noIcon/);
  });

  it('aplica variante voucher e renderiza children no lugar de value', () => {
    render(
      <InfoRow label="Voucher" variant="voucher">
        <button type="button">Visualizar</button>
      </InfoRow>,
    );

    expect(screen.getByRole('button', { name: 'Visualizar' })).toBeInTheDocument();
  });
});
