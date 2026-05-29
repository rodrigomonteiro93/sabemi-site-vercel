import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmissoresListSection from './EmissoresListSection';
import type { EmissorItem } from '@/lib/types/emissores';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function makeItem(overrides: Partial<EmissorItem> & Pick<EmissorItem, 'id'>): EmissorItem {
  return {
    nome: `Emissor ${overrides.id}`,
    email: `emissor${overrides.id}@email.com`,
    tel: '(11) 99999-9999',
    cpf: '123.456.789-00',
    perfil: 'emissor',
    comissao: null,
    ativo: true,
    data: '25/05/2025 09:47',
    ...overrides,
  };
}

const items: EmissorItem[] = [
  makeItem({ id: 1, nome: 'User teste', ativo: true }),
  makeItem({ id: 2, nome: 'Broker', perfil: 'financeiro', comissao: 10, ativo: true }),
  makeItem({ id: 3, nome: 'Emissor 001', ativo: false }),
  makeItem({ id: 4, nome: 'Nome emissor teste', ativo: false }),
  makeItem({ id: 5, nome: 'Novo teste', ativo: false }),
  ...Array.from({ length: 19 }, (_, i) =>
    makeItem({ id: 10 + i, nome: `Emissor Extra ${i}`, ativo: i % 2 === 0 }),
  ),
];

function getKpiStrip(container: HTMLElement) {
  return container.querySelector('[class*="kpiStrip"]') as HTMLElement;
}

function getKpiValue(container: HTMLElement, label: string): string {
  const strip = getKpiStrip(container);
  const cards = strip.querySelectorAll('[class*="kpi"]');
  for (const card of cards) {
    if (card.textContent?.includes(label)) {
      const valueEl = card.querySelector('[class*="v"]');
      return valueEl?.textContent ?? '';
    }
  }
  throw new Error(`KPI not found: ${label}`);
}

describe('EmissoresListSection', () => {
  it('renderiza 4 KPI cards com valores corretos', () => {
    const { container } = render(<EmissoresListSection items={items} />);

    expect(within(getKpiStrip(container)).getByText('Total cadastrados')).toBeInTheDocument();
    expect(within(getKpiStrip(container)).getByText('Ativos')).toBeInTheDocument();
    expect(within(getKpiStrip(container)).getByText('Inativos')).toBeInTheDocument();
    expect(within(getKpiStrip(container)).getByText('Com comissão custom')).toBeInTheDocument();

    const ativos = items.filter(e => e.ativo).length;
    const inativos = items.length - ativos;
    const custom = items.filter(e => e.comissao !== null).length;

    expect(getKpiValue(container, 'Total cadastrados')).toBe(String(items.length));
    expect(getKpiValue(container, 'Ativos')).toBe(String(ativos));
    expect(getKpiValue(container, 'Inativos')).toBe(String(inativos));
    expect(getKpiValue(container, 'Com comissão custom')).toBe(String(custom));
  });

  it('tab Ativos filtra apenas emissores com ativo true', async () => {
    const user = userEvent.setup();
    render(<EmissoresListSection items={items} />);

    await user.click(screen.getByRole('button', { name: /^Ativos/i }));

    expect(screen.getByText('User teste')).toBeInTheDocument();
    expect(screen.queryByText('Emissor 001')).not.toBeInTheDocument();
  });

  it('tab Inativos filtra apenas emissores com ativo false', async () => {
    const user = userEvent.setup();
    render(<EmissoresListSection items={items} />);

    await user.click(screen.getByRole('button', { name: /^Inativos/i }));

    expect(screen.getByText('Emissor 001')).toBeInTheDocument();
    expect(screen.queryByText('User teste')).not.toBeInTheDocument();
  });

  it('quick search filtra por nome, email e CPF', async () => {
    const user = userEvent.setup();
    const customItems = [
      makeItem({ id: 1, nome: 'Ana Beatriz', email: 'ana@email.com', cpf: '111.111.111-11' }),
      makeItem({ id: 2, nome: 'Carlos', email: 'carlos@email.com', cpf: '222.222.222-22' }),
    ];
    render(<EmissoresListSection items={customItems} />);

    await user.type(screen.getByPlaceholderText('Buscar nome, e-mail, CPF...'), 'ana@email.com');
    expect(screen.getByText('Ana Beatriz')).toBeInTheDocument();
    expect(screen.queryByText('Carlos')).not.toBeInTheDocument();
  });

  it('toggle ativo atualiza KPI values', async () => {
    const user = userEvent.setup();
    const smallItems = [
      makeItem({ id: 1, nome: 'Ativo Um', ativo: true }),
      makeItem({ id: 2, nome: 'Ativo Dois', ativo: true }),
    ];
    const { container } = render(<EmissoresListSection items={smallItems} />);

    expect(getKpiValue(container, 'Ativos')).toBe('2');
    expect(getKpiValue(container, 'Inativos')).toBe('0');

    const switches = screen.getAllByRole('switch');
    await user.click(switches[0]);

    expect(getKpiValue(container, 'Ativos')).toBe('1');
    expect(getKpiValue(container, 'Inativos')).toBe('1');
  });

  it('exclusão remove item da lista e atualiza KPIs', async () => {
    const user = userEvent.setup();
    const smallItems = [
      makeItem({ id: 1, nome: 'Para Excluir', ativo: true }),
      makeItem({ id: 2, nome: 'Permanente', ativo: true }),
    ];
    const { container } = render(<EmissoresListSection items={smallItems} />);

    expect(screen.getByText('2 cadastrados')).toBeInTheDocument();

    const deleteBtn = screen.getAllByRole('button', { name: 'Excluir' })[0];
    await user.click(deleteBtn);
    await user.click(screen.getByRole('button', { name: 'Sim, excluir' }));

    expect(screen.queryByText('Para Excluir')).not.toBeInTheDocument();
    expect(screen.getByText('1 cadastrados')).toBeInTheDocument();
    expect(getKpiValue(container, 'Total cadastrados')).toBe('1');
  });

  it('paginação limita 15 itens por página', async () => {
    const user = userEvent.setup();
    render(<EmissoresListSection items={items} />);

    expect(screen.getByText('User teste')).toBeInTheDocument();
    expect(screen.queryByText('Emissor Extra 14')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('Emissor Extra 14')).toBeInTheDocument();
  });
});
