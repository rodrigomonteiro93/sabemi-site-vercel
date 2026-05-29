import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FaturaComissoesSection from './FaturaComissoesSection';
import type { FaturaComissaoItem } from '@/lib/types/financeiro';

const items: FaturaComissaoItem[] = [
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
    id: '25300',
    plano: 'SABEMI 20K',
    cliente: 'Maria Santos',
    cpf: '111.222.333-44',
    emissor: 'Agência Teste',
    comissao: 'R$ 10,00',
    comissaoPct: '5,00%',
    net: 'R$ 90,00',
  },
];

describe('FaturaComissoesSection', () => {
  it('renderiza rows e totais', () => {
    render(
      <FaturaComissoesSection
        items={items}
        netTotal="R$ 166,06"
        comissaoTotal="R$ 49,82"
        currentPage={1}
        totalPages={1}
        totalItems={2}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Comissões da fatura' })).toBeInTheDocument();
    expect(screen.getByText(/comissões nesta fatura/)).toBeInTheDocument();
    expect(screen.getByText('Detalhamento')).toBeInTheDocument();
    expect(screen.getByText('R$ 166,06')).toBeInTheDocument();
    expect(screen.getByText('R$ 49,82')).toBeInTheDocument();
    expect(screen.getByText('Joao Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('exibe PaginationBar com currentPage correto', () => {
    render(
      <FaturaComissoesSection
        items={items}
        netTotal="R$ 166,06"
        comissaoTotal="R$ 49,82"
        currentPage={1}
        totalPages={1}
        totalItems={2}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/Página/)).toBeInTheDocument();
    expect(screen.getByText(/2 lançamentos/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toHaveClass(/active/);
    expect(screen.queryByText(/Mostrando \d+–\d+ de/)).not.toBeInTheDocument();
  });
});
