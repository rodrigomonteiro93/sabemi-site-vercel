import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PaxSection from './PaxSection';

const defaultProps = {
  index: 1,
  total: 4,
  isCollapsed: false,
  planName: 'SABEMI 15K BRASIL',
  ageRange: '0 a 60 anos',
  priceVista: '21,85',
  motivo: 'Lazer / Turismo / Negócios',
  destino: 'Brasil',
  periodo: '06/07/2026 - 10/07/2026 (5 dias)',
  onToggle: vi.fn(),
  onRemove: vi.fn(),
  onMinimize: vi.fn(),
};

describe('PaxSection', () => {
  it('renderiza título do passageiro e dados do plano no card head', () => {
    render(<PaxSection {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Inserir informações do passageiro 1' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dados da sua viagem — SABEMI 15K BRASIL \| 0 a 60 anos/)).toBeInTheDocument();
  });

  it('não aplica classe collapsed quando expandido', () => {
    const { container } = render(<PaxSection {...defaultProps} isCollapsed={false} />);

    expect(container.querySelector('section')?.className).not.toMatch(/collapsed/);
    expect(screen.getByText('Dados para Emissão do Voucher')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Minimizar' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000.000.000-00')).toBeInTheDocument();
  });

  it('aplica classe collapsed e exibe CTA de preenchimento', () => {
    const { container } = render(<PaxSection {...defaultProps} isCollapsed={true} />);

    expect(container.querySelector('section')?.className).toMatch(/collapsed/);
    expect(screen.getByText('Preencher dados do passageiro')).toBeInTheDocument();
  });

  it('preenche campo plano com o nome do plano', () => {
    render(<PaxSection {...defaultProps} />);

    expect(screen.getByDisplayValue('SABEMI 15K BRASIL')).toBeInTheDocument();
  });

  it('dispara onToggle ao clicar no botão expandir/colapsar', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<PaxSection {...defaultProps} onToggle={onToggle} />);

    await user.click(screen.getByRole('button', { name: 'Expandir / colapsar' }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('dispara onRemove ao clicar no botão remover', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<PaxSection {...defaultProps} onRemove={onRemove} />);

    await user.click(screen.getByRole('button', { name: 'Remover' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dispara onMinimize ao clicar em Minimizar', async () => {
    const user = userEvent.setup();
    const onMinimize = vi.fn();

    render(<PaxSection {...defaultProps} onMinimize={onMinimize} />);

    await user.click(screen.getByRole('button', { name: 'Minimizar' }));

    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('exibe botão Salvar e ir para passageiro N+1 quando onSaveAndNext é informado', async () => {
    const user = userEvent.setup();
    const onSaveAndNext = vi.fn();

    render(
      <PaxSection
        {...defaultProps}
        index={1}
        onSaveAndNext={onSaveAndNext}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Salvar e ir para passageiro 2/i }));

    expect(onSaveAndNext).toHaveBeenCalledTimes(1);
  });

  it('não exibe botão Salvar e ir quando onSaveAndNext é omitido', () => {
    render(<PaxSection {...defaultProps} index={4} />);

    expect(screen.queryByRole('button', { name: /Salvar e ir para passageiro/i })).not.toBeInTheDocument();
  });
});
