import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmissorRow from './EmissorRow';
import type { EmissorItem } from '@/lib/types/emissores';

const baseItem: EmissorItem = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@email.com',
  tel: '(11) 99999-9999',
  cpf: '123.456.789-00',
  perfil: 'emissor',
  comissao: null,
  ativo: true,
  data: '25/05/2025 09:47',
};

describe('EmissorRow', () => {
  it('renderiza nome, CPF, email e telefone do item', () => {
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('CPF 123.456.789-00')).toBeInTheDocument();
    expect(screen.getByText('joao@email.com')).toBeInTheDocument();
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();
  });

  it('renderiza PerfilBadge com variant correto', () => {
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );
    expect(screen.getByText('Emissor')).toBeInTheDocument();
  });

  it('Switch reflete item.ativo', () => {
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('chama onToggleAtivo ao clicar no Switch', async () => {
    const user = userEvent.setup();
    const onToggleAtivo = vi.fn();
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={onToggleAtivo}
      />,
    );

    await user.click(screen.getByRole('switch'));
    expect(onToggleAtivo).toHaveBeenCalledWith(1);
  });

  it('chama onDelete ao clicar em excluir', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onToggleAtivo={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Excluir' }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('chama onEdit ao clicar em Editar', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Editar/i }));
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it('exibe "N/F (padrão)" quando comissao é null', () => {
    render(
      <EmissorRow
        item={baseItem}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );
    expect(screen.getByText('N/F (padrão)')).toBeInTheDocument();
  });

  it('exibe valor formatado quando comissao não é null', () => {
    render(
      <EmissorRow
        item={{ ...baseItem, comissao: 10.5, perfil: 'financeiro' }}
        avatarColorIndex={1}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleAtivo={vi.fn()}
      />,
    );
    expect(screen.getByText('10,50%')).toBeInTheDocument();
    expect(screen.getByText('Financeiro')).toBeInTheDocument();
  });
});
