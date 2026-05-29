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

    expect(screen.getByLabelText('Destino')).toHaveValue('');
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

    expect(screen.getByLabelText('Destino')).toHaveValue('BR');
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

    await user.selectOptions(screen.getByLabelText('Destino'), 'AR');
    expect(onChange).toHaveBeenCalledWith('AR');
  });
});
