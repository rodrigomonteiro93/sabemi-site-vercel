import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CookieBanner from './CookieBanner';

describe('CookieBanner', () => {
  it('renderiza por padrão', () => {
    render(<CookieBanner />);
    expect(screen.getByText(/Nosso site utiliza cookies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CONCORDO' })).toBeInTheDocument();
  });

  it('desaparece ao clicar CONCORDO', async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await user.click(screen.getByRole('button', { name: 'CONCORDO' }));

    expect(screen.queryByText(/Nosso site utiliza cookies/i)).not.toBeInTheDocument();
  });
});
