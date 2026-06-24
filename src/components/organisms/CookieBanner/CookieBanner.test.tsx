import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, it, expect } from 'vitest';
import { COOKIE_CONSENT_KEY } from '@/lib/cookies/consent';
import CookieBanner from './CookieBanner';

describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza quando não há consentimento salvo', async () => {
    render(<CookieBanner />);

    expect(await screen.findByText(/Nosso site utiliza cookies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CONCORDO' })).toBeInTheDocument();
  });

  it('não renderiza quando o consentimento já foi salvo', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    render(<CookieBanner />);

    await waitFor(() => {
      expect(screen.queryByText(/Nosso site utiliza cookies/i)).not.toBeInTheDocument();
    });
  });

  it('desaparece ao clicar CONCORDO e persiste o consentimento', async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await user.click(await screen.findByRole('button', { name: 'CONCORDO' }));

    expect(screen.queryByText(/Nosso site utiliza cookies/i)).not.toBeInTheDocument();
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe('accepted');
  });

  it('não reaparece após remontar o componente', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<CookieBanner />);

    await user.click(await screen.findByRole('button', { name: 'CONCORDO' }));
    unmount();

    render(<CookieBanner />);

    await waitFor(() => {
      expect(screen.queryByText(/Nosso site utiliza cookies/i)).not.toBeInTheDocument();
    });
  });
});
