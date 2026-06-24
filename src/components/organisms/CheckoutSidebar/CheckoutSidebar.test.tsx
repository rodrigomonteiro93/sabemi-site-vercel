import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CheckoutSidebar from './CheckoutSidebar';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

const defaultProps = {
  paxCount: 1,
  totalCartao: 'R$ 18,40',
  totalVista: 'R$ 17,48',
  isMethodSelected: false,
  onFinalizar: vi.fn(),
};

describe('CheckoutSidebar', () => {
  beforeEach(() => {
    useCotacaoStore.setState({ appliedCupom: null });
  });

  it('botão "Finalizar compra" inicia disabled quando isMethodSelected=false', () => {
    render(<CheckoutSidebar {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Finalizar compra' })).toBeDisabled();
  });

  it('botão habilita quando isMethodSelected=true', () => {
    render(<CheckoutSidebar {...defaultProps} isMethodSelected={true} />);

    expect(screen.getByRole('button', { name: 'Finalizar compra' })).toBeEnabled();
  });

  it('onFinalizar é chamado ao clicar no botão habilitado', async () => {
    const user = userEvent.setup();
    const onFinalizar = vi.fn();

    render(
      <CheckoutSidebar
        {...defaultProps}
        isMethodSelected={true}
        onFinalizar={onFinalizar}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Finalizar compra' }));

    expect(onFinalizar).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Processando...' })).toBeDisabled();
  });

  it('renderiza cupom, totais e badge de segurança', () => {
    render(<CheckoutSidebar {...defaultProps} />);

    expect(screen.getByText('Cupom de desconto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: DESC10')).toBeInTheDocument();
    expect(screen.getByText('1 Passageiro(s)')).toBeInTheDocument();
    expect(screen.getByText('R$ 18,40')).toBeInTheDocument();
    expect(screen.getByText('R$ 17,48')).toBeInTheDocument();
    expect(screen.getByLabelText('Compra segura')).toBeInTheDocument();
  });

  it('aplica cupom mock e atualiza totais', async () => {
    const user = userEvent.setup();

    render(<CheckoutSidebar {...defaultProps} />);

    await user.type(screen.getByPlaceholderText('Ex: DESC10'), 'DESC10');
    await user.click(screen.getByRole('button', { name: 'Aplicar cupom' }));

    expect(screen.getByText('Cupom DESC10 aplicado: 10% de desconto.')).toBeInTheDocument();
    expect(screen.getByText('Desconto (DESC10)')).toBeInTheDocument();
    expect(screen.getByText('- R$ 1,75')).toBeInTheDocument();
    expect(screen.getByText('R$ 15,73')).toBeInTheDocument();
    expect(screen.getByText('R$ 16,56')).toBeInTheDocument();
  });

  it('exibe erro para cupom inválido', async () => {
    const user = userEvent.setup();

    render(<CheckoutSidebar {...defaultProps} />);

    await user.type(screen.getByPlaceholderText('Ex: DESC10'), 'INVALIDO');
    await user.click(screen.getByRole('button', { name: 'Aplicar cupom' }));

    expect(screen.getByText('Cupom inválido ou expirado.')).toBeInTheDocument();
    expect(screen.queryByText(/Desconto \(/)).not.toBeInTheDocument();
  });

  it('persiste cupom aplicado no store do carrinho', async () => {
    const user = userEvent.setup();

    render(<CheckoutSidebar {...defaultProps} />);

    await user.type(screen.getByPlaceholderText('Ex: DESC10'), 'DESC10');
    await user.click(screen.getByRole('button', { name: 'Aplicar cupom' }));

    expect(useCotacaoStore.getState().appliedCupom?.code).toBe('DESC10');
  });

  it('restaura cupom salvo ao reabrir o checkout', () => {
    useCotacaoStore.setState({
      appliedCupom: { code: 'DESC10', percent: 10, label: '10% de desconto' },
    });

    render(<CheckoutSidebar {...defaultProps} />);

    expect(screen.getByDisplayValue('DESC10')).toBeInTheDocument();
    expect(screen.getByText('Cupom DESC10 aplicado: 10% de desconto.')).toBeInTheDocument();
    expect(screen.getByText('Desconto (DESC10)')).toBeInTheDocument();
    expect(screen.getByText('R$ 15,73')).toBeInTheDocument();
  });
});
