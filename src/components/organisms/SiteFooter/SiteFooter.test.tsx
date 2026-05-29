import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SiteFooter from './SiteFooter';

describe('SiteFooter', () => {
  it('renderiza marca, newsletter e links', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('SABEMI SEGURADORA S.A.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Receba novidades/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'contato@sabemi.com.br' })).toBeInTheDocument();
  });
});
