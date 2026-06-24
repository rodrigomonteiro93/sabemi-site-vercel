import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MarkupBlock from './MarkupBlock';

describe('MarkupBlock', () => {
  it('renderiza slider e link para digitar quando visível', () => {
    render(
      <MarkupBlock
        value={30}
        hidden={false}
        onChange={vi.fn()}
        onToggleHidden={vi.fn()}
      />,
    );

    expect(screen.getByText('Ajustar Markup')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clique aqui para digitar/i })).toBeInTheDocument();
  });

  it('oculta controles quando hidden é true', () => {
    render(
      <MarkupBlock
        value={30}
        hidden
        onChange={vi.fn()}
        onToggleHidden={vi.fn()}
      />,
    );

    expect(screen.getByText('Ajustar Markup')).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  it('alterna para modo input e volta ao slider', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <MarkupBlock
        value={30}
        hidden={false}
        onChange={onChange}
        onToggleHidden={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Clique aqui para digitar/i }));

    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, '50');
    await user.click(screen.getByRole('button', { name: /Clique aqui para deslizar/i }));

    expect(onChange).toHaveBeenCalledWith(50);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('dispara onToggleHidden ao clicar no botão olho', async () => {
    const user = userEvent.setup();
    const onToggleHidden = vi.fn();

    render(
      <MarkupBlock
        value={30}
        hidden={false}
        onChange={vi.fn()}
        onToggleHidden={onToggleHidden}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Mostrar\/ocultar markup/i }));

    expect(onToggleHidden).toHaveBeenCalledTimes(1);
  });
});
