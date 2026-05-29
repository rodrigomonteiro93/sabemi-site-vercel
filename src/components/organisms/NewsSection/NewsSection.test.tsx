import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewsSection from './NewsSection';

describe('NewsSection', () => {
  it('renderiza título e cards de notícias', () => {
    render(<NewsSection />);

    expect(screen.getByRole('heading', { name: /Notícias e dicas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Clique para acessar todas as notícias/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(3);
    expect(screen.getByRole('heading', { name: /Argentina torna seguro/i })).toBeInTheDocument();
  });
});
