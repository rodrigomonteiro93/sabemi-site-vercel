import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CotacaoHero from './CotacaoHero';

describe('CotacaoHero', () => {
  it('renderiza banner com título e botão Saiba mais', () => {
    render(<CotacaoHero />);

    expect(screen.getByRole('heading', { name: 'Ficou com dúvida?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Saiba mais' })).toBeInTheDocument();
  });
});
