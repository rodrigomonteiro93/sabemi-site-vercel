import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoucherCard from './VoucherCard';

const baseProps = {
  id: '27270',
  total: 'R$ 217,96',
  nome: 'Juliano da Silva Monteiro',
  data: '19/04/2026',
  pedido: '#27270',
  planos: 1,
  status: 'cancel' as const,
  urlPag: false,
};

describe('VoucherCard', () => {
  it('renderiza cabeçalho "VOUCHER #ID"', () => {
    render(<VoucherCard {...baseProps} />);
    expect(screen.getByText('VOUCHER #27270')).toBeInTheDocument();
  });

  it('renderiza StatusBadge com variante correta', () => {
    render(<VoucherCard {...baseProps} status="emit" />);
    expect(screen.getByText('Emitido')).toBeInTheDocument();
  });

  it('exibe "URL pagamento" apenas quando urlPag: true', () => {
    const { rerender } = render(<VoucherCard {...baseProps} urlPag={false} />);
    expect(screen.queryByText('URL pagamento')).not.toBeInTheDocument();

    rerender(<VoucherCard {...baseProps} status="pendente" urlPag={true} />);
    expect(screen.getByText('URL pagamento')).toBeInTheDocument();
  });

  it('renderiza 3 info-rows com dados corretos', () => {
    render(<VoucherCard {...baseProps} />);

    expect(screen.getByText('R$ 217,96')).toBeInTheDocument();
    expect(screen.getByText('Cancelado')).toBeInTheDocument();
    expect(screen.getByText('Juliano da Silva Monteiro')).toBeInTheDocument();
    expect(screen.getByText('#27270')).toBeInTheDocument();
    expect(screen.getByText('19/04/2026')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Mais detalhes →')).toBeInTheDocument();
  });
});
