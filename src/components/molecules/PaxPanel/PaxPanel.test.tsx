import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PaxPanel from './PaxPanel';

describe('PaxPanel', () => {
  it('renderiza inputs de idade por passageiro', () => {
    render(
      <PaxPanel
        count={2}
        useBirthdate={false}
        onToggleBirthdate={vi.fn()}
        values={{ 'age-1': '30', 'age-2': '25' }}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Idade Passageiro nº 1')).toBeInTheDocument();
    expect(screen.getByText('Idade Passageiro nº 2')).toBeInTheDocument();
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(2);
  });

  it('usa type date quando useBirthdate é true', () => {
    const { container } = render(
      <PaxPanel
        count={1}
        useBirthdate
        onToggleBirthdate={vi.fn()}
        values={{}}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Data de Nascimento Passageiro nº 1')).toBeInTheDocument();
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
  });

  it('dispara onChange ao editar campo', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <PaxPanel
        count={1}
        useBirthdate={false}
        onToggleBirthdate={vi.fn()}
        values={{ 'age-1': '' }}
        onChange={onChange}
      />,
    );

    await user.type(screen.getByRole('spinbutton'), '40');
    expect(onChange).toHaveBeenCalled();
  });

  it('dispara onToggleBirthdate no switch', async () => {
    const user = userEvent.setup();
    const onToggleBirthdate = vi.fn();

    render(
      <PaxPanel
        count={1}
        useBirthdate={false}
        onToggleBirthdate={onToggleBirthdate}
        values={{}}
        onChange={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('switch'));
    expect(onToggleBirthdate).toHaveBeenCalledTimes(1);
  });
});
