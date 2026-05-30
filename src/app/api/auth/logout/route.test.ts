import { describe, it, expect, vi, beforeEach } from 'vitest';

const clearAuthTokenMock = vi.fn();

vi.mock('@/lib/auth/clearAuthToken', () => ({
  clearAuthToken: () => clearAuthTokenMock(),
}));

import { GET, POST } from './route';

describe('POST /api/auth/logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('remove o token e retorna ok', async () => {
    const response = await POST();

    expect(clearAuthTokenMock).toHaveBeenCalledOnce();
    expect(await response.json()).toEqual({ ok: true });
  });
});

describe('GET /api/auth/logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('remove o token e redireciona para /login', async () => {
    const request = new Request('http://localhost/api/auth/logout');
    const response = await GET(request);

    expect(clearAuthTokenMock).toHaveBeenCalledOnce();
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/login');
  });
});
