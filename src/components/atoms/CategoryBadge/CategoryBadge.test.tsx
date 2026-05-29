import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryBadge from './CategoryBadge';

describe('CategoryBadge', () => {
  it('renderiza variant intl', () => {
    render(<CategoryBadge variant="intl">Internacional</CategoryBadge>);
    const badge = screen.getByText('Internacional');
    expect(badge.className).toMatch(/intl/);
  });

  it('renderiza variant tur', () => {
    render(<CategoryBadge variant="tur">Turismo</CategoryBadge>);
    const badge = screen.getByText('Turismo');
    expect(badge.className).toMatch(/tur/);
  });
});
