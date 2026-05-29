import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CancelModal from './CancelModal';

const defaultProps = {
  isOpen: true,
  title: 'Solicitar cancelamento do pedido',
  alertText: <>Alerta de teste</>,
  subjectText: <>Pedido #27270</>,
  reasonOptions: ['Motivo A', 'Motivo B'],
  onClose: vi.fn(),
  onSubmit: vi.fn(),
};

describe('CancelModal', () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  it('não renderiza quando isOpen é false', () => {
    render(<CancelModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Solicitar cancelamento do pedido')).not.toBeInTheDocument();
  });

  it('renderiza backdrop e conteúdo quando isOpen é true', () => {
    render(<CancelModal {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Solicitar cancelamento do pedido' })).toBeInTheDocument();
    expect(screen.getByText('Alerta de teste')).toBeInTheDocument();
    expect(screen.getByText(/Pedido #27270/)).toBeInTheDocument();
  });

  it('valida campos antes de chamar onSubmit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CancelModal {...defaultProps} onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /Solicitar cancelamento/i }));

    expect(window.alert).toHaveBeenCalledWith('Selecione um motivo.');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('fecha ao clicar no backdrop', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<CancelModal {...defaultProps} onClose={onClose} />);

    await user.click(container.firstChild as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('reseta estado ao fechar via botão Voltar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(<CancelModal {...defaultProps} onClose={onClose} />);

    await user.selectOptions(screen.getByLabelText(/Motivo do cancelamento/i), 'Motivo A');
    await user.type(screen.getByLabelText(/Descrição \/ observações/i), 'Observação teste');
    await user.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(onClose).toHaveBeenCalled();

    rerender(<CancelModal {...defaultProps} isOpen onClose={onClose} />);

    expect(screen.getByLabelText(/Motivo do cancelamento/i)).toHaveValue('');
    expect(screen.getByLabelText(/Descrição \/ observações/i)).toHaveValue('');
  });

  it('chama onSubmit quando motivo e observações estão preenchidos', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CancelModal {...defaultProps} onSubmit={onSubmit} />);

    await user.selectOptions(screen.getByLabelText(/Motivo do cancelamento/i), 'Motivo A');
    await user.type(screen.getByLabelText(/Descrição \/ observações/i), 'Detalhe do cancelamento');
    await user.click(screen.getByRole('button', { name: /Solicitar cancelamento/i }));

    expect(onSubmit).toHaveBeenCalledWith('Motivo A', 'Detalhe do cancelamento');
    expect(screen.getByRole('button', { name: /Enviando/i })).toBeDisabled();
  });
});
