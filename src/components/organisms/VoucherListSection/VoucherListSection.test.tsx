import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoucherListSection from './VoucherListSection';
import type { VoucherItem } from '@/lib/types/dashboard';

const vouchers: VoucherItem[] = [
  { id: '27270', total: 'R$ 217,96', nome: 'Juliano da Silva Monteiro', data: '19/04/2026', pedido: '#27270', planos: 1, status: 'cancel', urlPag: false },
  { id: '27059', total: 'R$ 27,69', nome: 'Michael Jordan', data: '13/04/2026', pedido: '#27059', planos: 1, status: 'pendente', urlPag: true },
  { id: '26736', total: 'R$ 26,25', nome: 'Juliano da Silva Monteiro', data: '27/03/2026', pedido: '#26736', planos: 1, status: 'emit', urlPag: false },
];

describe('VoucherListSection', () => {
  it('renderiza 3 VoucherCards', () => {
    render(<VoucherListSection title="Últimos Vouchers" vouchers={vouchers} allHref="/vouchers" />);

    expect(screen.getByText('VOUCHER #27270')).toBeInTheDocument();
    expect(screen.getByText('VOUCHER #27059')).toBeInTheDocument();
    expect(screen.getByText('VOUCHER #26736')).toBeInTheDocument();
  });

  it('botão "Todos vouchers →" aponta para allHref', () => {
    render(<VoucherListSection title="Últimos Vouchers" vouchers={vouchers} allHref="/vouchers" />);

    const link = screen.getByRole('link', { name: 'Todos vouchers →' });
    expect(link).toHaveAttribute('href', '/vouchers');
  });
});
