import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ComissoesListSection from './ComissoesListSection';
import type { ComissaoItem } from '@/lib/types/comissoes';

function makeItem(overrides: Partial<ComissaoItem> & Pick<ComissaoItem, 'id' | 'status'>): ComissaoItem {
  return {
    date: '01/01/2026',
    emissor: 'Agência Teste',
    paxName: 'João Silva',
    paxDoc: '111.111.111-11',
    paxAvatarIndex: 1,
    comValue: 'R$ 100,00',
    comPct: '30,00%',
    netValue: 'R$ 333,33',
    _comNum: 100,
    ...overrides,
  };
}

const items: ComissaoItem[] = [
  makeItem({ id: 100, status: 'liberada', paxName: 'João Silva' }),
  makeItem({ id: 101, status: 'liberada', paxName: 'Maria Santos', emissor: 'Sua Corretora' }),
  makeItem({ id: 102, status: 'aguardando', paxName: 'Pedro Lima' }),
  makeItem({ id: 103, status: 'bloqueada', paxName: 'Ana Costa' }),
  ...Array.from({ length: 14 }, (_, i) =>
    makeItem({ id: 200 + i, status: 'liberada', paxName: `Passageiro ${i}` }),
  ),
];

describe('ComissoesListSection', () => {
  it('renderiza 4 KPIs', () => {
    render(<ComissoesListSection items={items} />);

    expect(screen.getByText('Total recebido')).toBeInTheDocument();
    expect(screen.getByText('Aguardando liberação')).toBeInTheDocument();
    expect(screen.getByText('Comissão média')).toBeInTheDocument();
    expect(screen.getByText('Lançamentos')).toBeInTheDocument();
  });

  it('renderiza tab Todas ativa por padrão', () => {
    render(<ComissoesListSection items={items} />);

    const todasTab = screen.getByRole('button', { name: /Todas/i });
    expect(todasTab.className).toMatch(/activeTab/);
  });

  it('filtrar por tab exibe apenas itens do status selecionado', async () => {
    const user = userEvent.setup();
    render(<ComissoesListSection items={items} />);

    await user.click(screen.getByRole('button', { name: /Aguardando/i }));

    expect(screen.getByText('#102')).toBeInTheDocument();
    expect(screen.queryByText('#100')).not.toBeInTheDocument();
    expect(screen.queryByText('#103')).not.toBeInTheDocument();
  });

  it('busca filtra por nome, emissor ou id', async () => {
    const user = userEvent.setup();
    render(<ComissoesListSection items={items} />);

    await user.type(screen.getByPlaceholderText('Buscar voucher, emissor, passageiro...'), 'Maria');

    expect(screen.getByText('#101')).toBeInTheDocument();
    expect(screen.queryByText('#100')).not.toBeInTheDocument();
  });

  it('paginação navega entre páginas', async () => {
    const user = userEvent.setup();
    render(<ComissoesListSection items={items} />);

    expect(screen.getByText('#100')).toBeInTheDocument();
    expect(screen.queryByText('#211')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(screen.queryByText('#100')).not.toBeInTheDocument();
    expect(screen.getByText('#211')).toBeInTheDocument();
  });
});
