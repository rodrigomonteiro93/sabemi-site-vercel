import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FaturaRow from './FaturaRow';
import type { FinanceiroItem } from '@/lib/types/financeiro';

function makeItem(overrides: Partial<FinanceiroItem>): FinanceiroItem {
  const venc = new Date(2026, 5, 10);
  return {
    id: 1132,
    date: '15/03/2026',
    dateObj: new Date(2026, 2, 15),
    venc,
    qPedidos: 3,
    totalPedidos: 1000,
    qComissoes: 2,
    totalComissoes: 200,
    total: 800,
    status: 'aberta',
    hasBoleto: true,
    ...overrides,
  };
}

describe('FaturaRow', () => {
  it('renderiza sem erros com item status aberta', () => {
    render(<FaturaRow item={makeItem({ status: 'aberta' })} onView={vi.fn()} onBoleto={vi.fn()} />);
    expect(screen.getByText('Fatura #1132')).toBeInTheDocument();
  });

  it('exibe Fatura #1132 e a data correta', () => {
    render(<FaturaRow item={makeItem({})} onView={vi.fn()} onBoleto={vi.fn()} />);
    expect(screen.getByText('Fatura #1132')).toBeInTheDocument();
    expect(screen.getByText('15/03/2026')).toBeInTheDocument();
  });

  it('status vencida exibe StatusBadge e dueLate', () => {
    const { container } = render(
      <FaturaRow
        item={makeItem({ status: 'vencida' })}
        onView={vi.fn()}
        onBoleto={vi.fn()}
      />,
    );
    expect(screen.getByText('Vencida')).toBeInTheDocument();
    expect(container.textContent).toMatch(/Venceu em/);
    const dueEl = container.querySelector('[class*="dueLate"]');
    expect(dueEl).toBeTruthy();
  });

  it('hasBoleto true e status diferente de recebida exibe botão 2ª via', () => {
    render(
      <FaturaRow
        item={makeItem({ hasBoleto: true, status: 'aberta' })}
        onView={vi.fn()}
        onBoleto={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /2ª via/i })).toBeInTheDocument();
  });

  it('status recebida exibe texto comprovante', () => {
    render(
      <FaturaRow
        item={makeItem({ status: 'recebida', hasBoleto: true })}
        onView={vi.fn()}
        onBoleto={vi.fn()}
      />,
    );
    expect(screen.getByText('comprovante')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /2ª via/i })).not.toBeInTheDocument();
  });

  it('dispara onView ao clicar no IconButton', async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(<FaturaRow item={makeItem({})} onView={onView} onBoleto={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Ver detalhes' }));
    expect(onView).toHaveBeenCalledWith(1132);
  });

  it('dispara onBoleto ao clicar em 2ª via', async () => {
    const user = userEvent.setup();
    const onBoleto = vi.fn();
    render(
      <FaturaRow
        item={makeItem({ hasBoleto: true, status: 'vencida' })}
        onView={vi.fn()}
        onBoleto={onBoleto}
      />,
    );
    await user.click(screen.getByRole('button', { name: /2ª via/i }));
    expect(onBoleto).toHaveBeenCalledWith(1132);
  });
});
