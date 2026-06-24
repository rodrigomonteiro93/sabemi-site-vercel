import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/molecules/FooterNewsletter', () => ({
  default: function MockFooterNewsletter() {
    return <div data-testid="footer-newsletter" />;
  },
}));

import SiteFooter from './SiteFooter';

describe('SiteFooter', () => {
  it('renderiza marca, newsletter e links', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('SABEMI SEGURADORA S.A.')).toBeInTheDocument();
    expect(screen.getByTestId('footer-newsletter')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'contato@sabemi.com.br' })).toBeInTheDocument();
  });
});
