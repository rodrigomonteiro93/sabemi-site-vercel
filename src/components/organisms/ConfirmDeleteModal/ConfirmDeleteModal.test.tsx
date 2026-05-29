import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ConfirmDeleteModal from './ConfirmDeleteModal';

describe('ConfirmDeleteModal', () => {
  it('não exibe quando isOpen é false', () => {
    render(
      <ConfirmDeleteModal
        isOpen={false}
        name="João Silva"
        onConfirm={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(screen.queryByText('Excluir emissor')).not.toBeInTheDocument();
  });

  it('exibe nome do emissor em negrito', () => {
    render(
      <ConfirmDeleteModal
        isOpen
        name="João Silva"
        onConfirm={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('João Silva').tagName).toBe('B');
  });

  it('onConfirm chamado ao clicar Sim, excluir', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDeleteModal
        isOpen
        name="João Silva"
        onConfirm={onConfirm}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sim, excluir' }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('onClose chamado ao clicar Cancelar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ConfirmDeleteModal
        isOpen
        name="João Silva"
        onConfirm={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('onClose chamado ao clicar fora do modal (backdrop)', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <ConfirmDeleteModal
        isOpen
        name="João Silva"
        onConfirm={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(container.firstChild as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });
});
