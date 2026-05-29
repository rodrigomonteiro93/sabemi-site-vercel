import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CheckoutSidebar from './CheckoutSidebar';

const defaultProps = {
  paxCount: 1,
  totalCartao: 'R$ 18,40',
  totalVista: 'R$ 17,48',
  isMethodSelected: false,
  onFinalizar: vi.fn(),
};

describe('CheckoutSidebar', () => {
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
    expect(screen.getByText('1 Passageiro(s)')).toBeInTheDocument();
    expect(screen.getByText('R$ 18,40')).toBeInTheDocument();
    expect(screen.getByText('R$ 17,48')).toBeInTheDocument();
    expect(screen.getByLabelText('Compra segura')).toBeInTheDocument();
  });
});
