import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TermsCheckbox from './TermsCheckbox';

describe('TermsCheckbox', () => {
  it('renderiza checkbox desmarcado e link de termos', () => {
    render(<TermsCheckbox checked={false} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole('link', { name: 'termos de uso' })).toHaveAttribute('href', '/termos-de-uso');
    expect(screen.getByText(/condições gerais do seguro e cobertura do produto/)).toBeInTheDocument();
  });

  it('reflete estado checked', () => {
    render(<TermsCheckbox checked={true} onChange={vi.fn()} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('dispara onChange ao marcar o checkbox', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TermsCheckbox checked={false} onChange={onChange} />);

    await user.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
