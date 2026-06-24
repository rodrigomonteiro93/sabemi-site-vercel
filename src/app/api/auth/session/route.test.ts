import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

import { cookies } from 'next/headers';
import { GET } from './route';

describe('GET /api/auth/session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna authenticated true quando auth-token está presente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: 'abc123' }),
    });

    const response = await GET();
    expect(await response.json()).toEqual({ authenticated: true });
  });

  it('retorna authenticated false quando auth-token está ausente', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => undefined,
    });

    const response = await GET();
    expect(await response.json()).toEqual({ authenticated: false });
  });

  it('retorna authenticated false quando auth-token está vazio', async () => {
    (cookies as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: () => ({ name: 'auth-token', value: '' }),
    });

    const response = await GET();
    expect(await response.json()).toEqual({ authenticated: false });
  });
});
