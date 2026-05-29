import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VideosSection from './VideosSection';

describe('VideosSection', () => {
  it('renderiza seção de vídeos com cards e navegação', () => {
    render(<VideosSection />);

    expect(screen.getByRole('heading', { name: 'Vídeos de Conteúdo' })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeInTheDocument();
  });
});
