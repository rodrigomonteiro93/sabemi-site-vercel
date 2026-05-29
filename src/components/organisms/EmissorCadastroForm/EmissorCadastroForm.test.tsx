import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmissorCadastroForm from './EmissorCadastroForm';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const FIELD_LABELS = [
  'Perfil *',
  'Nome Completo *',
  'E-mail *',
  'Senha *',
  'Confirmar Senha *',
  'Telefone *',
  'CPF *',
];

async function fillBaseFields(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByRole('combobox'), 'emissor');
  await user.type(screen.getByPlaceholderText('email@sabemi.com.br'), 'teste@sabemi.com.br');

  const textInputs = screen.getAllByRole('textbox');
  await user.type(textInputs[0], 'João Silva');

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  await user.type(passwordInputs[0], 'senha1234');
  await user.type(passwordInputs[1], 'senha1234');

  await user.type(screen.getByPlaceholderText('(99) 9999.9999'), '11999999999');
  await user.type(screen.getByPlaceholderText('999.999.999-99'), '12345678901');
}

describe('EmissorCadastroForm', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renderiza sem erros com formulário vazio', () => {
    render(<EmissorCadastroForm />);

    expect(screen.getByText('Dados do emissor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('exibe hint informativo com textos Emissor e Financeiro', () => {
    render(<EmissorCadastroForm />);

    expect(
      screen.getByText(/pode cotar e emitir vouchers em nome da agência/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/tem acesso a comissões, faturas e relatórios financeiros/i),
    ).toBeInTheDocument();
  });

  it('exibe 7 campos (perfil, nome, email, senha, confirmarSenha, telefone, cpf)', () => {
    render(<EmissorCadastroForm />);

    FIELD_LABELS.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    const fieldNames = ['perfil', 'nome', 'email', 'senha', 'confirmarSenha', 'telefone', 'cpf'];
    fieldNames.forEach((name) => {
      expect(document.querySelector(`[name="${name}"]`)).toBeInTheDocument();
    });
  });

  it('exibe erro As senhas não conferem quando senhas divergem', async () => {
    const user = userEvent.setup();
    render(<EmissorCadastroForm />);

    await user.selectOptions(screen.getByRole('combobox'), 'emissor');
    await user.type(screen.getAllByRole('textbox')[0], 'João Silva');
    await user.type(screen.getByPlaceholderText('email@sabemi.com.br'), 'teste@sabemi.com.br');

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    await user.type(passwordInputs[0], 'senha1234');
    await user.type(passwordInputs[1], 'outrasenha');

    await user.type(screen.getByPlaceholderText('(99) 9999.9999'), '11999999999');
    await user.type(screen.getByPlaceholderText('999.999.999-99'), '12345678901');

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(await screen.findByText('As senhas não conferem')).toBeInTheDocument();
  });

  it('botão submit exibe Cadastrando... durante isSubmitting', async () => {
    const user = userEvent.setup();
    render(<EmissorCadastroForm />);

    await fillBaseFields(user);
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cadastrando...' })).toBeInTheDocument();
    });
  });

  it('botão Cancelar navega para /emissores', async () => {
    const user = userEvent.setup();
    render(<EmissorCadastroForm />);

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(pushMock).toHaveBeenCalledWith('/emissores');
  });
});
