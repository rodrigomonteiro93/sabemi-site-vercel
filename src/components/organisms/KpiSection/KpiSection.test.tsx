import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KpiSection from './KpiSection';
import type { KpiItemData } from '@/lib/types/dashboard';

const items: KpiItemData[] = [
  { variant: 'vouchers', label: 'Vouchers emitidos', value: '38', valueSmall: 'vouchers', sub: '↑ <b>+12%</b>' },
  { variant: 'comissoes', label: 'Total em comissões', value: 'R$ 2.143', valueSmall: ',80', sub: '23 lançamentos' },
  { variant: 'faturas', label: 'Faturas a vencer', value: 'R$ 487', valueSmall: ',20', sub: '<b>3</b> faturas' },
];

describe('KpiSection', () => {
  it('renderiza 3 KpiCards', () => {
    render(<KpiSection title="Resumo dos últimos 30 dias" items={items} />);

    expect(screen.getByText('Vouchers emitidos')).toBeInTheDocument();
    expect(screen.getByText('Total em comissões')).toBeInTheDocument();
    expect(screen.getByText('Faturas a vencer')).toBeInTheDocument();
  });

  it('renderiza título correto', () => {
    render(<KpiSection title="Resumo dos últimos 30 dias" items={items} />);
    expect(screen.getByText('Resumo dos últimos 30 dias')).toBeInTheDocument();
  });
});
