import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmissoresInlineForm from './EmissoresInlineForm';
import type { EmissorItem } from '@/lib/types/emissores';

const editingItem: EmissorItem = {
  id: 5,
  nome: 'Maria Eduarda',
  email: 'maria@agencia.com',
  tel: '(11) 98765-4321',
  cpf: '321.456.789-09',
  perfil: 'financeiro',
  comissao: 15,
  ativo: true,
  data: '12/03/2025 14:22',
};

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByRole('combobox'), 'emissor');
  const textInputs = screen.getAllByRole('textbox');
  await user.type(textInputs[0], 'Novo Emissor');
  await user.type(screen.getByPlaceholderText('email@sabemi.com.br'), 'novo@sabemi.com.br');

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  await user.type(passwordInputs[0], 'senha123');
  await user.type(passwordInputs[1], 'senha123');

  await user.type(screen.getByPlaceholderText('(99) 9999.9999'), '11999998888');
  await user.type(screen.getByPlaceholderText('999.999.999-99'), '12345678901');
}

describe('EmissoresInlineForm', () => {
  it('não renderiza corpo quando isOpen é false', () => {
    const { container } = render(
      <EmissoresInlineForm
        isOpen={false}
        editingItem={null}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/formCardCollapsed/);
  });

  it('renderiza título "Cadastrar novo emissor" quando editingItem é null', () => {
    render(
      <EmissoresInlineForm
        isOpen
        editingItem={null}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );
    expect(screen.getByText('Cadastrar novo emissor')).toBeInTheDocument();
  });

  it('renderiza título "Editar emissor — {nome}" quando editingItem presente', () => {
    render(
      <EmissoresInlineForm
        isOpen
        editingItem={editingItem}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );
    expect(screen.getByText('Editar emissor — Maria Eduarda')).toBeInTheDocument();
  });

  it('botão submit exibe "Cadastrar" em modo criação', () => {
    render(
      <EmissoresInlineForm
        isOpen
        editingItem={null}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('botão submit exibe "Salvar alterações" em modo edição', () => {
    render(
      <EmissoresInlineForm
        isOpen
        editingItem={editingItem}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });

  it('onClose chamado ao clicar no botão fechar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <EmissoresInlineForm
        isOpen
        editingItem={null}
        onClose={onClose}
        onSave={vi.fn()}
      />,
    );

    const closeBtn = container.querySelector('button[class*="close"]') as HTMLButtonElement;
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('onSave chamado com dados corretos ao submeter', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <EmissoresInlineForm
        isOpen
        editingItem={null}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          perfil: 'emissor',
          nome: 'Novo Emissor',
          email: 'novo@sabemi.com.br',
          senha: 'senha123',
          confirmarSenha: 'senha123',
          tel: '11999998888',
          cpf: '12345678901',
        }),
        null,
      );
    });
  });
});
