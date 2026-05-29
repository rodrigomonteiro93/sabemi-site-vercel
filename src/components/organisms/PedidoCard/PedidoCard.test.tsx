import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PedidoCard from './PedidoCard';

const minimalProps = {
  pedidoId: '27270',
  heroTotalLabel: 'Valor total do pedido',
  heroTotal: 'R$ 217,96',
  heroTotalSub: '2 passageiros · FATURADO',
  statusVariant: 'cancel' as const,
  statusSub: 'cancelado em 23/04/2026',
  emitidoEm: '19/04/2026 · 09:30',
  infoItems: [
    { label: 'Cliente', value: 'Agencia Teste' },
    { label: 'E-mail', value: 'test@example.com' },
  ],
};

describe('PedidoCard', () => {
  it('renderiza sem erros com props mínimas', () => {
    render(<PedidoCard {...minimalProps} />);

    expect(screen.getByText(/Pedido #27270/)).toBeInTheDocument();
    expect(screen.getByText('R$ 217,96')).toBeInTheDocument();
    expect(screen.getByText('19/04/2026 · 09:30')).toBeInTheDocument();
  });

  it('exibe StatusBadge com variante correta', () => {
    render(<PedidoCard {...minimalProps} />);

    expect(screen.getByText('Cancelado')).toBeInTheDocument();
  });

  it('renderiza todos os infoItems passados', () => {
    render(<PedidoCard {...minimalProps} />);

    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Agencia Teste')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
