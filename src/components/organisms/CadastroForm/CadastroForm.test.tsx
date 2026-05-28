import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CadastroForm from './CadastroForm';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('CadastroForm', () => {
  beforeEach(() => {
    pushMock.mockClear();
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
});
