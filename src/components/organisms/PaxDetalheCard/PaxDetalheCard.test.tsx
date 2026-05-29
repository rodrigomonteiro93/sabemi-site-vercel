import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PaxDetalheCard from './PaxDetalheCard';

const baseProps = {
  voucherId: '168071',
  passengerName: 'Juliano da Silva Monteiro',
  initials: 'JM',
  avatarColorIndex: 1 as const,
  statusLabel: 'CANCELADO',
  statusVariant: 'cancel' as const,
  conditionsHref: '#',
  comissaoValue: 'R$ 65,39',
  comissaoPct: '30,00%',
  netValue: 'R$ 152,57',
  cancelLabel: 'Cancelado',
  onCancelClick: vi.fn(),
  voucherActions: 'none' as const,
  infoItems: [{ label: 'Nome', value: 'Juliano da Silva Monteiro' }],
};

describe('PaxDetalheCard', () => {
  it('renderiza com cancelDisabled mostrando botão desabilitado', () => {
    render(<PaxDetalheCard {...baseProps} cancelDisabled />);

    const btn = screen.getByRole('button', { name: /Cancelado/i });
    expect(btn).toBeDisabled();
  });

  it('renderiza com voucherActions view-download exibindo Visualizar e Download', () => {
    render(
      <PaxDetalheCard
        {...baseProps}
        voucherActions="view-download"
        voucherNumero="SA-202604027707"
        cancelDisabled={false}
        cancelLabel="Solicitar cancelamento"
        statusLabel="EMITIDO"
        statusVariant="emit"
      />,
    );

    expect(screen.getByRole('button', { name: /Visualizar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
    expect(screen.getByText('SA-202604027707')).toBeInTheDocument();
  });

  it('chama onCancelClick ao clicar no botão de cancelamento', async () => {
    const user = userEvent.setup();
    const onCancelClick = vi.fn();

    render(
      <PaxDetalheCard
        {...baseProps}
        cancelDisabled={false}
        cancelLabel="Solicitar cancelamento"
        onCancelClick={onCancelClick}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Solicitar cancelamento/i }));
    expect(onCancelClick).toHaveBeenCalledOnce();
  });
});
