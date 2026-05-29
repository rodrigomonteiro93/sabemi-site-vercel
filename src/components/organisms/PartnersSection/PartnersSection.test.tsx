import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PartnersSection from './PartnersSection';

describe('PartnersSection', () => {
  it('renderiza título, parceiros e navegação', () => {
    render(<PartnersSection />);

    expect(screen.getByRole('heading', { name: 'Parceiros' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Eu Viajo Seguro' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Intermac Seguro Viagem' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeInTheDocument();
  });
});
