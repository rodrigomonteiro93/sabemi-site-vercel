import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import IdadeRow from './IdadeRow';

describe('IdadeRow', () => {
  it('renderiza passageiro titular na primeira linha', () => {
    render(
      <IdadeRow
        index={0}
        value={33}
        onChange={vi.fn()}
        onRemove={vi.fn()}
        canRemove={false}
      />,
    );

    expect(screen.getByText('Passageiro 1 (titular)')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(33);
    expect(screen.getByRole('button', { name: 'Remover' })).toBeDisabled();
  });

  it('renderiza passageiro sem titular e botão remover habilitado', () => {
    render(
      <IdadeRow
        index={1}
        value={30}
        onChange={vi.fn()}
        onRemove={vi.fn()}
        canRemove
      />,
    );

    expect(screen.getByText('Passageiro 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remover' })).toBeEnabled();
  });

  it('dispara onChange ao alterar idade', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <IdadeRow
        index={0}
        value={33}
        onChange={onChange}
        onRemove={vi.fn()}
        canRemove={false}
      />,
    );

    await user.clear(screen.getByRole('spinbutton'));
    await user.type(screen.getByRole('spinbutton'), '45');

    expect(onChange).toHaveBeenCalled();
  });

  it('dispara onRemove ao clicar em Remover', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <IdadeRow
        index={1}
        value={30}
        onChange={vi.fn()}
        onRemove={onRemove}
        canRemove
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Remover' }));

    expect(onRemove).toHaveBeenCalledWith(1);
  });
});
