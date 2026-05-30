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

import PartnersSection from './PartnersSection';
import { HOME_PARTNERS_MOCK } from '@/lib/mocks/partners';

describe('PartnersSection', () => {
  it('renderiza título, parceiros e navegação', () => {
    render(<PartnersSection partners={HOME_PARTNERS_MOCK} />);

    expect(screen.getByRole('heading', { name: 'Parceiros' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(7);
    expect(screen.getByRole('img', { name: 'Eu Viajo Seguro' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Intermac Seguro Viagem' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Assist Card' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Travel Ace' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeInTheDocument();
  });
});
