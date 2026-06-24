import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
  headers: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProtectedLayout from './layout';

describe('ProtectedLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza children quando auth-token está presente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: 'abc123' }),
    });
    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => null,
    });

    const result = await ProtectedLayout({ children: <div>Conteúdo protegido</div> });
    render(result as React.ReactElement);

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('chama redirect para /login quando auth-token está ausente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => undefined,
    });
    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => null,
    });

    await ProtectedLayout({ children: <div>Conteúdo protegido</div> });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('chama redirect para /login com callbackUrl quando auth-token está vazio', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: '' }),
    });
    (headers as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: (key: string) => (key === 'x-pathname' ? '/vouchers' : null),
    });

    await ProtectedLayout({ children: <div>Conteúdo protegido</div> });

    expect(redirect).toHaveBeenCalledWith('/login?callbackUrl=%2Fvouchers');
  });
});
