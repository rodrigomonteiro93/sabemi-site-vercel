import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const subscribeNewsletterMock = vi.fn();

vi.mock('@/lib/api/newsletter-client', () => ({
  subscribeNewsletter: (...args: unknown[]) => subscribeNewsletterMock(...args),
}));

import FooterNewsletter from './FooterNewsletter';

describe('FooterNewsletter', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    subscribeNewsletterMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 600)),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    subscribeNewsletterMock.mockReset();
  });

  it('renderiza título e campos de nome e e-mail', () => {
    render(<FooterNewsletter />);

    expect(screen.getByRole('heading', { name: /Receba novidades/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escreva seu nome *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@sabemi.com.br')).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade/i)).toBeInTheDocument();
  });

  it('exibe estado de envio e sucesso ao inscrever', async () => {
    const user = userEvent.setup();
    render(<FooterNewsletter />);

    await user.type(screen.getByPlaceholderText('Escreva seu nome *'), 'Maria');
    await user.type(screen.getByPlaceholderText('email@sabemi.com.br'), 'maria@sabemi.com.br');
    await user.click(screen.getByRole('button', { name: 'Inscrever' }));

    expect(screen.getByRole('button', { name: 'Enviando...' })).toBeDisabled();

    vi.advanceTimersByTime(600);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Inscrito ✓' })).toBeInTheDocument();
    });
    expect(subscribeNewsletterMock).toHaveBeenCalledWith({
      nome: 'Maria',
      email: 'maria@sabemi.com.br',
    });
    expect(screen.getByPlaceholderText('Escreva seu nome *')).toHaveValue('');
    expect(screen.getByPlaceholderText('email@sabemi.com.br')).toHaveValue('');
  });
});
