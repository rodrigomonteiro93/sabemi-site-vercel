import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuoteFieldSelect from './QuoteFieldSelect';

describe('QuoteFieldSelect', () => {
  it('exibe placeholder quando value vazio', () => {
    render(
      <QuoteFieldSelect
        label="Destino"
        options={[{ value: 'BR', label: 'Brasil' }]}
        value=""
        onChange={vi.fn()}
        placeholder="Selecione o destino"
      />,
    );

    expect(screen.getByText('Selecione o destino')).toBeInTheDocument();
  });

  it('exibe label da opção selecionada', () => {
    render(
      <QuoteFieldSelect
        label="Destino"
        options={[{ value: 'BR', label: 'Brasil' }]}
        value="BR"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Brasil')).toBeInTheDocument();
  });

  it('chama onChange ao selecionar option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <QuoteFieldSelect
        label="Destino"
        options={[
          { value: 'BR', label: 'Brasil' },
          { value: 'AR', label: 'Argentina' },
        ]}
        value=""
        onChange={onChange}
        placeholder="Selecione"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Destino' }));
    await user.click(screen.getByRole('option', { name: 'Argentina' }));
    expect(onChange).toHaveBeenCalledWith('AR');
  });

  it('exibe grupos no dropdown', async () => {
    const user = userEvent.setup();

    render(
      <QuoteFieldSelect
        label="Destino"
        groups={[
          { label: 'Brasil', options: [{ value: 'BR', label: 'Brasil (Nacional)' }] },
          { label: 'América do Sul', options: [{ value: 'AR', label: 'Argentina' }] },
        ]}
        value=""
        onChange={vi.fn()}
        placeholder="Para onde você vai viajar? *"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Destino' }));
    expect(screen.getByText('América do Sul')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Argentina' })).toBeInTheDocument();
  });
});
