import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/lib/metadata/createPageMetadata', () => ({
  createPageMetadata: () => async () => ({}),
}));

import { redirect } from 'next/navigation';
import LogoutPage from './page';

describe('LogoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redireciona para o route handler de logout', () => {
    LogoutPage();

    expect(redirect).toHaveBeenCalledWith('/api/auth/logout');
  });
});
