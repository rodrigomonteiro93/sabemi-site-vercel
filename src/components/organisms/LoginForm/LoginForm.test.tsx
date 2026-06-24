import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoginForm from './LoginForm';

const assignMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('callbackUrl=%2Fvouchers'),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    assignMock.mockClear();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { assign: assignMock },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza sem erros', () => {
    render(<LoginForm />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('exibe o campo CPF / CNPJ', () => {
    render(<LoginForm />);
    expect(screen.getByText('CPF / CNPJ *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000.000.000-00')).toBeInTheDocument();
  });

  it('exibe os campos CPF/CNPJ e Senha', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('000.000.000-00')).toBeInTheDocument();
    expect(document.getElementById('userPwd')).toBeInTheDocument();
  });

  it('exibe checkbox Lembrar senha', () => {
    render(<LoginForm />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Lembrar senha')).toBeInTheDocument();
  });

  it('exibe botão Entrar habilitado', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
  });

  it('exibe link Esqueceu sua senha?', () => {
    render(<LoginForm />);
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
  });

  it('exibe erros ao submeter form vazio', async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findAllByText('Obrigatório')).toHaveLength(2);
  });

  it('redireciona para callbackUrl após login bem-sucedido', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
    } as Response);

    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText('000.000.000-00'), '999.999.999-99');
    await user.type(document.getElementById('userPwd')!, '123456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(assignMock).toHaveBeenCalledWith('/vouchers');
    });
  });

  it('exibe mensagem de erro para credenciais inválidas', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Credenciais inválidas' }),
    } as Response);

    render(<LoginForm />);
    await user.type(screen.getByPlaceholderText('000.000.000-00'), '111.111.111-11');
    await user.type(document.getElementById('userPwd')!, 'errado');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument();
    expect(assignMock).not.toHaveBeenCalled();
  });
});
