import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/molecules/SiteCarousel', () => ({
  default: function MockSiteCarousel({
    slides,
    prevButtonClassName,
    nextButtonClassName,
  }: {
    slides: React.ReactNode[];
    prevButtonClassName?: string;
    nextButtonClassName?: string;
  }) {
    return (
      <div data-testid="site-carousel">
        <button type="button" className={prevButtonClassName} aria-label="Anterior" />
        {slides}
        <button type="button" className={nextButtonClassName} aria-label="Próximo" />
      </div>
    );
  },
}));

import VideosSection from './VideosSection';
import { HOME_VIDEOS_MOCK } from '@/lib/mocks/videos';

describe('VideosSection', () => {
  it('renderiza seção de vídeos com cards e navegação', () => {
    render(<VideosSection videos={HOME_VIDEOS_MOCK} />);

    expect(screen.getByRole('heading', { name: 'Vídeos de Conteúdo' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeInTheDocument();
  });
});
