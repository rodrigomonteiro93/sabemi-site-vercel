import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import VoucherRow from './VoucherRow';
import type { VoucherPageItem } from '@/lib/types/vouchers';

const today = new Date(2026, 4, 27);

const baseItem: VoucherPageItem = {
  id: 12345,
  nome: 'Mariana Castro',
  destino: 'Portugal',
  dias: 7,
  start: '01/06/2026',
  end: '07/06/2026',
  total: 'R$ 1.234,56',
  comissao: 'R$ 123,45',
  status: 'emit',
};

const defaultProps = {
  avatarColorIndex: 1 as const,
  today,
  onView: vi.fn(),
  onDownload: vi.fn(),
  onResend: vi.fn(),
  onCancel: vi.fn(),
};

describe('VoucherRow', () => {
  it('renderiza sem erros com props mínimas', () => {
    render(<VoucherRow item={baseItem} {...defaultProps} />);
    expect(screen.getByText('Mariana Castro')).toBeInTheDocument();
  });

  it('exibe nome, voucher ID, destino e datas corretamente', () => {
    const { container } = render(<VoucherRow item={baseItem} {...defaultProps} />);

    expect(screen.getByText('Mariana Castro')).toBeInTheDocument();
    expect(screen.getByText('Voucher #12345')).toBeInTheDocument();
    expect(screen.getByText('Portugal')).toBeInTheDocument();
    expect(screen.getByText('7 dias de viagem')).toBeInTheDocument();
    expect(container.textContent).toContain('01/06/2026');
    expect(container.textContent).toContain('07/06/2026');
  });

  it('when-tag exibe "Embarca em" para status emit com data futura', () => {
    render(<VoucherRow item={baseItem} {...defaultProps} />);
    expect(screen.getByText(/Embarca em \d+ dia/)).toBeInTheDocument();
  });

  it('menu popup abre ao clicar em menu-btn e fecha ao clicar fora', async () => {
    const user = userEvent.setup();
    const { container } = render(<VoucherRow item={baseItem} {...defaultProps} />);

    const menuPop = container.querySelector('[class*="menuPop"]') as HTMLElement;
    expect(menuPop.className).not.toMatch(/menuPopOpen/);

    await user.click(screen.getByRole('button', { name: 'Mais ações' }));
    expect(menuPop.className).toMatch(/menuPopOpen/);

    await user.click(document.body);
    expect(menuPop.className).not.toMatch(/menuPopOpen/);
  });

  it('botão Cancelar voucher fica desabilitado quando status é cancel', async () => {
    const user = userEvent.setup();
    render(
      <VoucherRow
        item={{ ...baseItem, status: 'cancel', comissao: null }}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Mais ações' }));
    expect(screen.getByRole('button', { name: 'Cancelar voucher' })).toBeDisabled();
  });

  it('onView é chamado ao clicar em Visualizar detalhes no menu', async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(<VoucherRow item={baseItem} {...defaultProps} onView={onView} />);

    await user.click(screen.getByRole('button', { name: 'Mais ações' }));
    await user.click(screen.getByRole('button', { name: 'Visualizar detalhes' }));
    expect(onView).toHaveBeenCalledWith(12345);
  });
});
