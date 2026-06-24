import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewsCard from './NewsCard';

describe('NewsCard', () => {
  it('renderiza título, data e categoria', () => {
    render(
      <NewsCard
        imageUrl="https://example.com/img.jpg"
        category="Viagens Internacionais"
        categoryVariant="intl"
        date="19/05/2025"
        title="Argentina torna seguro viagem obrigatório"
      />,
    );

    expect(screen.getByRole('heading', { name: /Argentina torna seguro/i })).toBeInTheDocument();
    expect(screen.getByText('19/05/2025')).toBeInTheDocument();
    expect(screen.getByText('Viagens Internacionais')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /IR PARA O TEXTO/i })).toBeInTheDocument();
  });
});
