import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { cookies } from 'next/headers';
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

    const result = await ProtectedLayout({ children: <div>Conteúdo protegido</div> });
    render(result as React.ReactElement);

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('chama redirect para /login quando auth-token está ausente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => undefined,
    });

    await ProtectedLayout({ children: <div>Conteúdo protegido</div> });

    expect(redirect).toHaveBeenCalledWith('/login');
  });
});
