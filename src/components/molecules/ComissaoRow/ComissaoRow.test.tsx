import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComissaoRow from './ComissaoRow';
import type { ComissaoItem } from '@/lib/types/comissoes';

const item: ComissaoItem = {
  id: 27864,
  date: '15/03/2026',
  emissor: 'Agência Teste',
  paxName: 'João Silva',
  paxDoc: '123.456.789-00',
  paxAvatarIndex: 1,
  comValue: 'R$ 150,00',
  comPct: '30,00%',
  netValue: 'R$ 500,00',
  status: 'liberada',
  _comNum: 150,
};

describe('ComissaoRow', () => {
  it('renderiza id, nome, emissor, comValue e status badge', () => {
    render(<ComissaoRow item={item} avatarColorIndex={1} />);

    expect(screen.getByText('#27864')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 150,00')).toBeInTheDocument();
    expect(screen.getByText('Liberada')).toBeInTheDocument();
  });
});
