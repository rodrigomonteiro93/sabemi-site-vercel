import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SiteHeader from './SiteHeader';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('SiteHeader', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: async () => ({ authenticated: false }),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza logo, navegação e login', async () => {
    render(<SiteHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Sabemi')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Carrinho' })).toBeInTheDocument();
  });
});
