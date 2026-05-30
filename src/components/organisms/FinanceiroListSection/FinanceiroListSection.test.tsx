import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinanceiroListSection from './FinanceiroListSection';
import { generateMockFaturas } from '@/lib/types/financeiro';
import type { FinanceiroItem } from '@/lib/types/financeiro';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

function makeItem(
  overrides: Partial<FinanceiroItem> & Pick<FinanceiroItem, 'id' | 'status'>,
): FinanceiroItem {
  const dateObj = new Date(2026, 0, 1);
  const venc = new Date(2026, 0, 15);
  return {
    date: '01/01/2026',
    dateObj,
    venc,
    qPedidos: 1,
    totalPedidos: 1000,
    qComissoes: 1,
    totalComissoes: 100,
    total: 900,
    hasBoleto: false,
    ...overrides,
  };
}

const smallItems: FinanceiroItem[] = [
  makeItem({ id: 100, status: 'vencida', date: '01/01/2026' }),
  makeItem({ id: 101, status: 'vencida', date: '02/01/2026' }),
  makeItem({ id: 102, status: 'aberta', date: '03/01/2026' }),
  makeItem({ id: 103, status: 'processando', date: '04/01/2026' }),
  makeItem({ id: 104, status: 'recebida', date: '05/01/2026' }),
  ...Array.from({ length: 14 }, (_, i) =>
    makeItem({ id: 200 + i, status: 'recebida', date: `10/01/2026` }),
  ),
];

describe('FinanceiroListSection', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renderiza com array de 132 itens sem erros', () => {
    const items = generateMockFaturas();
    render(<FinanceiroListSection items={items} />);
    expect(screen.getByText('Financeiro — Faturas')).toBeInTheDocument();
    expect(screen.getByText('132 faturas')).toBeInTheDocument();
  });

  it('KPI Vencidas usa colorVariant danger', () => {
    render(<FinanceiroListSection items={smallItems} />);
    const sub = screen.getByText('2 faturas em atraso');
    const kpi = sub.closest('[class*="kpi"]') as HTMLElement;
    expect(kpi.className).toMatch(/danger/);
  });

  it('KPI A vencer usa colorVariant warning', () => {
    render(<FinanceiroListSection items={smallItems} />);
    const label = screen.getByText('A vencer (30 dias)');
    const kpi = label.closest('[class*="kpi"]') as HTMLElement;
    expect(kpi.className).toMatch(/warning/);
  });

  it('tab Vencidas filtra lista para status vencida', async () => {
    const user = userEvent.setup();
    render(<FinanceiroListSection items={smallItems} />);

    await user.click(screen.getByRole('button', { name: /Vencidas/i }));

    expect(screen.getByText('Fatura #100')).toBeInTheDocument();
    expect(screen.getByText('Fatura #101')).toBeInTheDocument();
    expect(screen.queryByText('Fatura #102')).not.toBeInTheDocument();
    expect(screen.queryByText('Fatura #103')).not.toBeInTheDocument();
  });

  it('tab Abertas exibe itens aberta e processando', async () => {
    const user = userEvent.setup();
    render(<FinanceiroListSection items={smallItems} />);

    await user.click(screen.getByRole('button', { name: /Abertas/i }));

    expect(screen.getByText('Fatura #102')).toBeInTheDocument();
    expect(screen.getByText('Fatura #103')).toBeInTheDocument();
    expect(screen.queryByText('Fatura #100')).not.toBeInTheDocument();
  });

  it('busca por ID filtra lista corretamente', async () => {
    const user = userEvent.setup();
    render(<FinanceiroListSection items={smallItems} />);

    await user.type(screen.getByPlaceholderText('Buscar fatura...'), '102');

    expect(screen.getByText('Fatura #102')).toBeInTheDocument();
    expect(screen.queryByText('Fatura #100')).not.toBeInTheDocument();
  });

  it('paginação exibe no máximo 15 itens por página', async () => {
    const user = userEvent.setup();
    const items = generateMockFaturas();
    render(<FinanceiroListSection items={items} />);

    const firstPageIds = items.slice(0, 15).map(i => i.id);
    const sixteenthId = items[15]?.id;
    firstPageIds.forEach(id => {
      expect(screen.getByText(`Fatura #${id}`)).toBeInTheDocument();
    });
    if (sixteenthId) {
      expect(screen.queryByText(`Fatura #${sixteenthId}`)).not.toBeInTheDocument();
    }

    await user.click(screen.getByRole('button', { name: '2' }));
    if (sixteenthId) {
      expect(screen.getByText(`Fatura #${sixteenthId}`)).toBeInTheDocument();
    }
    expect(screen.queryByText(`Fatura #${firstPageIds[0]}`)).not.toBeInTheDocument();
  });
});
