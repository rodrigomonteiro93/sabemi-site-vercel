import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PaymentFormSection from './PaymentFormSection';

const defaultProps = {
  agencia: 'Agência Teste',
  pax: ['Juliano da Silva Monteiro', 'Maria Eduarda Monteiro'],
  valorCartao: 18.4,
};

function getPaymentMethodSelect() {
  return document.getElementById('paymentMethod') as HTMLSelectElement;
}

describe('PaymentFormSection', () => {
  it('inicia sem conteúdo condicional renderizado', () => {
    render(<PaymentFormSection {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Forma de pagamento' })).toBeInTheDocument();
    expect(getPaymentMethodSelect()).toHaveValue('');
    expect(screen.queryByText('Pagamento faturado para a agência')).not.toBeInTheDocument();
    expect(screen.queryByText('VISA')).not.toBeInTheDocument();
    expect(screen.queryByText('Pagamento via Pix')).not.toBeInTheDocument();
    expect(screen.queryByText('Link de pagamento')).not.toBeInTheDocument();
    expect(screen.queryByText('Pagador')).not.toBeInTheDocument();
  });

  it('renderiza FaturadoInfo ao selecionar "faturado"', async () => {
    const user = userEvent.setup();
    render(<PaymentFormSection {...defaultProps} />);

    await user.selectOptions(getPaymentMethodSelect(), 'faturado');

    expect(screen.getByText('Pagamento faturado para a agência')).toBeInTheDocument();
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
  });

  it('renderiza CardIconsGroup ao selecionar "cartao"', async () => {
    const user = userEvent.setup();
    render(<PaymentFormSection {...defaultProps} />);

    await user.selectOptions(getPaymentMethodSelect(), 'cartao');

    expect(screen.getByText('VISA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0000 0000 0000 0000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Como escrito no cartão')).toBeInTheDocument();
  });

  it('renderiza select de pagador ao selecionar "boleto"', async () => {
    const user = userEvent.setup();
    render(<PaymentFormSection {...defaultProps} />);

    await user.selectOptions(getPaymentMethodSelect(), 'boleto');

    expect(screen.getByText('Pagador')).toBeInTheDocument();
    expect(document.getElementById('boletoPagador')).toBeInTheDocument();
    expect(
      screen.getByText('O boleto será emitido em nome do pagador selecionado.'),
    ).toBeInTheDocument();
  });

  it('renderiza PayPlaceholder ao selecionar "pix"', async () => {
    const user = userEvent.setup();
    render(<PaymentFormSection {...defaultProps} />);

    await user.selectOptions(getPaymentMethodSelect(), 'pix');

    expect(screen.getByText('Pagamento via Pix')).toBeInTheDocument();
    expect(
      screen.getByText(/será exibido o QR Code e o código copia-e-cola/),
    ).toBeInTheDocument();
  });

  it('renderiza PayPlaceholder ao selecionar "link"', async () => {
    const user = userEvent.setup();
    render(<PaymentFormSection {...defaultProps} />);

    await user.selectOptions(getPaymentMethodSelect(), 'link');

    expect(screen.getByText('Link de pagamento')).toBeInTheDocument();
    expect(
      screen.getByText(/será gerado e enviado por e-mail e WhatsApp/),
    ).toBeInTheDocument();
  });

  it('notifica onMethodChange ao selecionar método', async () => {
    const user = userEvent.setup();
    const onMethodChange = vi.fn();

    render(<PaymentFormSection {...defaultProps} onMethodChange={onMethodChange} />);

    await user.selectOptions(getPaymentMethodSelect(), 'pix');

    expect(onMethodChange).toHaveBeenCalledWith('pix');
  });
});
