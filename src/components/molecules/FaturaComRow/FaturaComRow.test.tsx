import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FaturaComRow from './FaturaComRow';
import type { FaturaComissaoItem } from '@/lib/types/financeiro';

const item: FaturaComissaoItem = {
  id: '25299',
  plano: 'SABEMI 15K Brasil',
  cliente: 'Joao Silva',
  cpf: '881.344.970-47',
  emissor: 'Agência Teste',
  comissao: 'R$ 0,00',
  comissaoPct: '0,00%',
  net: 'R$ 83,03',
};

describe('FaturaComRow', () => {
  it('renderiza voucher, nome, cpf, emissor e valores', () => {
    render(<FaturaComRow item={item} avatarColorIndex={1} />);

    expect(screen.getByText('#25299')).toBeInTheDocument();
    expect(screen.getByText('Joao Silva')).toBeInTheDocument();
    expect(screen.getByText('CPF 881.344.970-47')).toBeInTheDocument();
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 83,03')).toBeInTheDocument();
  });

  it('exibe avatar com iniciais corretas', () => {
    render(<FaturaComRow item={item} avatarColorIndex={2} />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });
});
