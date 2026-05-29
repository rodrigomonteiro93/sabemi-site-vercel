import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FaturaCard from './FaturaCard';
import type { FaturaInfoItem } from '@/lib/types/financeiro';

const infoItems: FaturaInfoItem[] = [
  { icon: <span>ico1</span>, label: 'Data emissão', value: '25/01/2026' },
  { icon: <span>ico2</span>, label: 'Vencimento', value: '04/02/2026', valueVariant: 'danger' },
];

const defaultProps = {
  id: '5069',
  heroTotalLabel: 'Total a pagar',
  heroTotal: 'R$ 116,24',
  heroTotalSub: '1 pedido · 2 comissões deduzidas',
  statusVariant: 'vencida' as const,
  statusSub: 'Venceu em 04/02/2026 (113 dias em atraso)',
  statusSubLate: true,
  infoItems,
  onBoleto: vi.fn(),
};

describe('FaturaCard', () => {
  it('renderiza card-head com id da fatura', () => {
    render(<FaturaCard {...defaultProps} />);
    expect(screen.getByText(/Fatura #5069/)).toBeInTheDocument();
  });

  it('renderiza hero com total e status', () => {
    render(<FaturaCard {...defaultProps} />);

    expect(screen.getByText('Total a pagar')).toBeInTheDocument();
    expect(screen.getByText('R$ 116,24')).toBeInTheDocument();
    expect(screen.getByText('Vencida')).toBeInTheDocument();
    expect(screen.getByText('Venceu em 04/02/2026 (113 dias em atraso)')).toBeInTheDocument();
  });

  it('chama onBoleto ao clicar no botão Visualizar boleto', async () => {
    const user = userEvent.setup();
    const onBoleto = vi.fn();
    render(<FaturaCard {...defaultProps} onBoleto={onBoleto} />);

    await user.click(screen.getByRole('button', { name: /Visualizar boleto/i }));
    expect(onBoleto).toHaveBeenCalledOnce();
  });

  it('renderiza todos os infoItems', () => {
    render(<FaturaCard {...defaultProps} />);

    expect(screen.getByText('Data emissão')).toBeInTheDocument();
    expect(screen.getByText('25/01/2026')).toBeInTheDocument();
    expect(screen.getByText('Vencimento')).toBeInTheDocument();
    expect(screen.getByText('04/02/2026')).toBeInTheDocument();
  });
});
