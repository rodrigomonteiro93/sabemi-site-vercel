import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const pushMock = vi.fn();
const registerCadastroMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('@/lib/api/cadastro-client', () => ({
  registerCadastro: (...args: unknown[]) => registerCadastroMock(...args),
}));

import CadastroForm from './CadastroForm';

async function fillCadastroForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Seu nome completo *'), 'João Silva');
  await user.type(screen.getByLabelText('E-mail Login *'), 'joao@sabemi.com.br');
  await user.type(screen.getByLabelText('Telefone *'), '51999999999');
  await user.type(screen.getByLabelText('CPF *'), '12345678900');
  await user.type(screen.getByLabelText('Data de Nascimento *'), '01011990');
  await user.type(screen.getByLabelText('Senha *'), '123456');
  await user.type(screen.getByLabelText('Confirmar Senha *'), '123456');
  await user.type(screen.getByLabelText('CNPJ *'), '12345678000190');
  await user.type(screen.getByLabelText('Nome Fantasia *'), 'Agência Teste');
  await user.type(screen.getByLabelText('Razão Social *'), 'Agência Teste LTDA');
  await user.type(screen.getByLabelText('SUSEP *'), '12345');
  await user.type(screen.getByLabelText('CEP *'), '90010190');
  await user.type(screen.getByLabelText('Endereço *'), 'Rua Teste');
  await user.type(screen.getByLabelText('Bairro *'), 'Centro');
  await user.selectOptions(screen.getByLabelText('Estado *'), 'RS');

  const cidadeSelect = screen.getByLabelText('Cidade *') as HTMLSelectElement;
  const cidadeOption = document.createElement('option');
  cidadeOption.value = 'Porto Alegre';
  cidadeOption.text = 'Porto Alegre';
  cidadeSelect.appendChild(cidadeOption);
  await user.selectOptions(cidadeSelect, 'Porto Alegre');

  await user.type(screen.getByLabelText('Número *'), '100');
}

describe('CadastroForm', () => {
  beforeEach(() => {
    pushMock.mockClear();
    registerCadastroMock.mockReset();
    registerCadastroMock.mockResolvedValue(undefined);
  });

  it('renders without errors', () => {
    render(<CadastroForm />);

    expect(screen.getByRole('heading', { name: 'Dados de Endereço' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();
  });

  it('shows SUSEP label when tipoCadastro is corretora', () => {
    render(<CadastroForm />);

    expect(screen.getByText('SUSEP *')).toBeInTheDocument();
  });

  it('shows CADASTUR label when tipoCadastro is agencia', async () => {
    const user = userEvent.setup();
    render(<CadastroForm />);

    await user.selectOptions(document.getElementById('tipoCadastro') as HTMLSelectElement, 'agencia');

    expect(screen.getByText('CADASTUR *')).toBeInTheDocument();
  });

  it('has Cadastrar button enabled by default', () => {
    render(<CadastroForm />);

    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeEnabled();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<CadastroForm />);

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(screen.getAllByText('Obrigatório').length).toBeGreaterThan(0);
    });
  });

  it('envia cadastro mockado e redireciona para login', async () => {
    const user = userEvent.setup();
    render(<CadastroForm />);

    await fillCadastroForm(user);
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(
      () => {
        expect(registerCadastroMock).toHaveBeenCalledWith({
          tipoCadastro: 'corretora',
          nome: 'João Silva',
          email: 'joao@sabemi.com.br',
          telefone: '(51) 99999-9999',
          cpf: '123.456.789-00',
          dataNascimento: '01/01/1990',
          senha: '123456',
          cnpj: '12.345.678/0001-90',
          nomeFantasia: 'Agência Teste',
          razaoSocial: 'Agência Teste LTDA',
          registroTipo: '12345',
          cep: '90010-190',
          endereco: 'Rua Teste',
          bairro: 'Centro',
          estado: 'RS',
          cidade: 'Porto Alegre',
          numero: '100',
          complemento: '',
        });
      },
      { timeout: 5000 },
    );
    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
