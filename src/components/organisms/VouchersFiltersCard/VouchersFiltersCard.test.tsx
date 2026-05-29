import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import VouchersFiltersCard from './VouchersFiltersCard';

describe('VouchersFiltersCard', () => {
  it('não renderiza body quando isOpen=false', () => {
    const { container } = render(
      <VouchersFiltersCard isOpen={false} onFilter={vi.fn()} onClear={vi.fn()} />,
    );

    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/collapsed/);
  });

  it('renderiza todos os 7 campos quando isOpen=true', () => {
    render(<VouchersFiltersCard isOpen={true} onFilter={vi.fn()} onClear={vi.fn()} />);

    expect(screen.getByPlaceholderText('0000000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('nome do passageiro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('999.999.999-99')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('dd/mm/aaaa')).toHaveLength(4);
  });

  it('submit chama onFilter com os valores do formulário', async () => {
    const user = userEvent.setup();
    const onFilter = vi.fn();

    render(<VouchersFiltersCard isOpen={true} onFilter={onFilter} onClear={vi.fn()} />);

    await user.type(screen.getByPlaceholderText('0000000'), '12345');
    await user.type(screen.getByPlaceholderText('nome do passageiro'), 'Mariana');
    await user.click(screen.getByRole('button', { name: 'Buscar voucher' }));

    expect(onFilter).toHaveBeenCalledWith({
      numeroPedido: '12345',
      nomePassageiro: 'Mariana',
      cpf: '',
      emissaoInicio: '',
      emissaoFim: '',
      dataIda: '',
      dataVolta: '',
    });
  });

  it('Limpar filtros reseta o form e chama onClear', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<VouchersFiltersCard isOpen={true} onFilter={vi.fn()} onClear={onClear} />);

    await user.type(screen.getByPlaceholderText('0000000'), '12345');
    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));

    expect(onClear).toHaveBeenCalled();
    expect(screen.getByPlaceholderText('0000000')).toHaveValue('');
  });
});
