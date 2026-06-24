import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GuestLayout from './layout';

describe('GuestLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza children quando auth-token está ausente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => undefined,
    });

    const result = await GuestLayout({ children: <div>Formulário de login</div> });
    render(result as React.ReactElement);

    expect(screen.getByText('Formulário de login')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('não redireciona com auth-token vazio', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: '' }),
    });

    const result = await GuestLayout({ children: <div>Formulário de login</div> });
    render(result as React.ReactElement);

    expect(screen.getByText('Formulário de login')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('chama redirect para /dashboard quando auth-token está presente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: 'abc123' }),
    });

    await GuestLayout({ children: <div>Formulário de login</div> });

    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });
});
