import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FaturaDetalheContent from './page-content';
import type { FaturaDetalheData } from '@/lib/types/financeiro';

vi.mock('next/navigation', () => ({
  usePathname: () => '/financeiro/5069',
}));

const mockFatura: FaturaDetalheData = {
  id: '5069',
  geradaEm: 'Gerada em 25/01/2026 às 06:00',
  heroTotalLabel: 'Total a pagar',
  heroTotal: 'R$ 116,24',
  heroTotalSub: '1 pedido · 2 comissões deduzidas',
  statusVariant: 'vencida',
  statusSub: 'Venceu em 04/02/2026 (113 dias em atraso)',
  statusSubLate: true,
  infoItems: [
    { icon: <span>ico</span>, label: 'Data emissão', value: '25/01/2026 06:00:09' },
    { icon: <span>ico</span>, label: 'Vencimento', value: '04/02/2026', valueVariant: 'danger' },
  ],
  comissoes: [
    {
      id: '25299',
      plano: 'SABEMI 15K Brasil',
      cliente: 'Joao Silva',
      cpf: '881.344.970-47',
      emissor: 'Agência Teste',
      comissao: 'R$ 0,00',
      comissaoPct: '0,00%',
      net: 'R$ 83,03',
    },
    {
      id: '25299',
      plano: 'SABEMI 15K Brasil',
      cliente: 'Manuel Silva',
      cpf: '996.314.800-03',
      emissor: 'Agência Teste',
      comissao: 'R$ 0,00',
      comissaoPct: '0,00%',
      net: 'R$ 83,03',
    },
  ],
  netTotal: 'R$ 166,06',
  comissaoTotal: 'R$ 49,82',
  totalItems: 2,
};

describe('FaturaDetalheContent', () => {
  it('renderiza BackLink com href /financeiro', () => {
    render(<FaturaDetalheContent fatura={mockFatura} />);

    const link = screen.getByRole('link', { name: /Voltar para Financeiro/i });
    expect(link).toHaveAttribute('href', '/financeiro');
  });

  it('renderiza FaturaCard com os dados do mock', () => {
    render(<FaturaDetalheContent fatura={mockFatura} />);

    expect(screen.getByText('Total a pagar')).toBeInTheDocument();
    expect(screen.getByText('R$ 116,24')).toBeInTheDocument();
    expect(screen.getByText('Vencida')).toBeInTheDocument();
    expect(screen.getByText('Data emissão')).toBeInTheDocument();
    expect(screen.getByText('Vencimento')).toBeInTheDocument();
  });

  it('renderiza FaturaComissoesSection com as comissões', () => {
    render(<FaturaDetalheContent fatura={mockFatura} />);

    expect(screen.getByText('Detalhamento')).toBeInTheDocument();
    expect(screen.getByText('Joao Silva')).toBeInTheDocument();
    expect(screen.getByText('Manuel Silva')).toBeInTheDocument();
    expect(screen.getByText(/Valor NET total:/)).toBeInTheDocument();
    expect(screen.getByText('R$ 166,06')).toBeInTheDocument();
  });
});
