import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FooterNewsletter from './FooterNewsletter';

describe('FooterNewsletter', () => {
  it('renderiza título e campos de nome e e-mail', () => {
    render(<FooterNewsletter />);

    expect(screen.getByRole('heading', { name: /Receba novidades/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escreva seu nome *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@sabemi.com.br')).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade/i)).toBeInTheDocument();
  });
});
