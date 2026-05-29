import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LoginForm', () => {
  it('renderiza sem erros', () => {
    render(<LoginForm />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
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
});
