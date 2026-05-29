import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import VouchersListSection from './VouchersListSection';
import type { VoucherPageItem } from '@/lib/types/vouchers';

function makeItem(overrides: Partial<VoucherPageItem> & Pick<VoucherPageItem, 'id' | 'status'>): VoucherPageItem {
  return {
    nome: `Passageiro ${overrides.id}`,
    destino: 'Portugal',
    dias: 7,
    start: '01/06/2026',
    end: '07/06/2026',
    total: 'R$ 100,00',
    comissao: 'R$ 10,00',
    ...overrides,
  };
}

const items: VoucherPageItem[] = [
  makeItem({ id: 100, status: 'emit', nome: 'João Silva' }),
  makeItem({ id: 101, status: 'emit', nome: 'Maria Santos' }),
  makeItem({ id: 102, status: 'pendente', nome: 'Pedro Lima' }),
  makeItem({ id: 103, status: 'cancel', nome: 'Ana Costa' }),
  ...Array.from({ length: 14 }, (_, i) =>
    makeItem({ id: 200 + i, status: 'emit', nome: `Passageiro Extra ${i}` }),
  ),
];

describe('VouchersListSection', () => {
  it('tab Todos exibe contagem total de items', () => {
    render(<VouchersListSection items={items} />);

    expect(screen.getByText(`${items.length} vouchers`)).toBeInTheDocument();
    const todosTab = screen.getByRole('tab', { name: /Todos/i });
    expect(todosTab).toHaveTextContent(String(items.length));
  });

  it('filtra por tab emit e mostra apenas emitidos', async () => {
    const user = userEvent.setup();
    render(<VouchersListSection items={items} />);

    await user.click(screen.getByRole('tab', { name: /Emitidos/i }));

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.queryByText('Pedro Lima')).not.toBeInTheDocument();
    expect(screen.queryByText('Ana Costa')).not.toBeInTheDocument();
  });

  it('busca rápida filtra por nome do passageiro', async () => {
    const user = userEvent.setup();
    render(<VouchersListSection items={items} />);

    await user.type(
      screen.getByPlaceholderText('Buscar rápido por voucher, cliente, destino...'),
      'Maria',
    );

    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });

  it('paginação navega entre páginas (PER_PAGE = 15)', async () => {
    const user = userEvent.setup();
    render(<VouchersListSection items={items} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.queryByText('Passageiro Extra 13')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('Passageiro Extra 13')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });

  it('botão Filtrar alterna filtersOpen', async () => {
    const user = userEvent.setup();
    const { container } = render(<VouchersListSection items={items} />);

    const filtersCard = container.querySelector('[class*="filtersCard"]') as HTMLElement;
    expect(filtersCard.className).toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: 'Filtrar' }));
    expect(filtersCard.className).not.toMatch(/collapsed/);

    await user.click(screen.getByRole('button', { name: 'Filtrar' }));
    expect(filtersCard.className).toMatch(/collapsed/);
  });
});
