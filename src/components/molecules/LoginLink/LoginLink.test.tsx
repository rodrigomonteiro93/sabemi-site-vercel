import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoginLink from './LoginLink';

describe('LoginLink', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza link de login quando não autenticado', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: async () => ({ authenticated: false }),
    });

    render(<LoginLink />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
  });

  it('renderiza link de minha conta quando autenticado', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: async () => ({ authenticated: true }),
    });

    render(<LoginLink />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Minha Conta/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Minha Conta/i })).toHaveAttribute('href', '/dashboard');
  });
});
